import { PrismaClient } from '@prisma/client';
import { hashvalue, compareValue } from '../utils/bcrypt';
import { thirtyDaysFromNow } from '../utils/date';
import { signToken, refreshTokenSignOptions, verifyToken } from '../utils/jwt';
import appAssert from '../utils/app-assert';
import { UNAUTHORIZED_REQUEST } from '../configs/http-status-codes';
import { prisma } from '../configs/prisma';

export type CreateOrgAccountType = {
  email: string;
  password: string;
  name: string;
  industry: string;
  userAgent?: string;
};

export const createOrgAccount = async (data: CreateOrgAccountType) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  appAssert(!existingUser, 409, 'Email already exists');

  const hashedPassword = await hashvalue(data.password);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      role: 'ORGANIZATION',
      organization: {
        create: {
          name: data.name,
          industry: data.industry,
          website: '',
          address: '',
          description: '',
        },
      },
    },
    include: { organization: true },
  });

  appAssert(user.organization, 500, 'Organization creation failed');

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

  const accessToken = signToken({
    userId: user.id,
    sessionId: session.id,
  });

  return {
    org: {
      id: user.organization.id,
      name: user.organization.name,
      email: user.email,
      industry: user.organization.industry,
    },
    accessToken,
    refreshToken,
  };
};

export type LoginOrgParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const loginOrg = async ({
  email,
  password,
  userAgent,
}: LoginOrgParams) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { organization: true },
  });

  appAssert(
    user?.role === 'ORGANIZATION',
    UNAUTHORIZED_REQUEST,
    'Invalid credentials',
  );

  appAssert(user.organization, UNAUTHORIZED_REQUEST, 'Organization not found');

  const isValid = await compareValue(password, user.password);
  appAssert(isValid, UNAUTHORIZED_REQUEST, 'Invalid credentials');

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
    org: {
      id: user.organization.id,
      name: user.organization.name,
      email: user.email,
      industry: user.organization.industry,
    },
    accessToken,
    refreshToken,
  };
};

export const refreshOrgAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<{ sessionId: number }>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });

  appAssert(payload, UNAUTHORIZED_REQUEST, 'Invalid Refresh Token');

  const now = Date.now();
  const session = await prisma.session.findUnique({
    where: { id: payload.sessionId },
    include: { user: true },
  });

  appAssert(
    session && session.expiresAt.getTime() > now,
    UNAUTHORIZED_REQUEST,
    'Session Expired',
  );

  appAssert(
    session.user.role === 'ORGANIZATION',
    UNAUTHORIZED_REQUEST,
    'Invalid session type',
  );

  const sessionNeedsRefresh =
    session.expiresAt.getTime() - now <= 24 * 60 * 60 * 1000;

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
