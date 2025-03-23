import {
  HttpStatusCode,
  UNAUTHORIZED_REQUEST,
} from '../configs/http-status-code';
import { prisma } from '../configs/prisma';
import appAssert from '../utils/app-assert';
import { compareValue, hashvalue } from '../utils/bcrypt';
import { ONE_DAY_MS, thirtyDaysFromNow } from '../utils/date';
import {
  refreshTokenSignOptions,
  signToken,
  verifyToken,
  type RefreshTokenPayload,
} from '../utils/jwt';

export type CreateAccountType = {
  email: string;
  password: string;
  userAgent?: string;
};

const createAccount = async (data: CreateAccountType) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await hashvalue(data.password);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      verified: false,
    },
  });

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      userAgent: data.userAgent,
      expiresAt: thirtyDaysFromNow(),
    },
  });

  const refreshToken = signToken(
    { sessionId: session.id },
    refreshTokenSignOptions,
  );

  const accessToken = signToken({ userId: user.id, sessionId: session.id });

  return {
    user: {
      id: user.id,
      email: user.email,
      verified: user.verified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    accessToken,
    refreshToken,
  };
};

export type LoginParams = {
  email: string;
  password: string;
  userAgent?: string;
};

/**
 * @param param0
 *  get the user by email
 *	verfiy if it exists
 *	if the user exists then validate the user password with the hashpassword stored in the database
 *	if password is validate then create a session
 *	sign the access & refresh token
 *	return user & tokens
 */

const loginUser = async ({ email, password, userAgent }: LoginParams) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isValid = await compareValue(password, user.password);

  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      userAgent,
      expiresAt: thirtyDaysFromNow(),
    },
  });

  const refreshToken = signToken(
    { sessionId: session.id },
    refreshTokenSignOptions,
  );

  const accessToken = signToken({
    userId: user.id,
    sessionId: session.id,
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      verified: user.verified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    accessToken,
    refreshToken,
  };
};

const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });

  if (!payload) {
    throw new Error('Invalid Refresh Token');
  }

  const now = Date.now();
  const session = await prisma.session.findUnique({
    where: { id: payload.sessionId },
  });

  if (!session || session.expiresAt.getTime() <= now) {
    throw new Error('Session Expired');
  }

  const sessionNeedsRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS;

  if (sessionNeedsRefresh) {
    await prisma.session.update({
      where: { id: session.id },
      data: { expiresAt: thirtyDaysFromNow() },
    });
  }

  const newRefreshToken = sessionNeedsRefresh
    ? signToken({ sessionId: session.id }, refreshTokenSignOptions)
    : undefined;

  const accessToken = signToken({
    userId: session.userId,
    sessionId: session.id,
  });

  return {
    accessToken,
    newRefreshToken,
  };
};

export { createAccount, loginUser, refreshUserAccessToken };
