import { prisma } from '../configs/prisma';
import { hashvalue, compareValue } from '../utils/bcrypt';
import { thirtyDaysFromNow } from '../utils/date';
import { signToken, refreshTokenSignOptions, verifyToken } from '../utils/jwt';
import appAssert from '../utils/app-assert';
import { UNAUTHORIZED_REQUEST } from '../configs/http-status-codes';

export type CreateOrgAccountType = {
  email: string;
  password: string;
  name: string;
  industry: string;
  userAgent?: string;
};

export class AuthError extends Error {
  constructor(message: string, public statusCode: number = 400) {
    super(message);
    this.name = 'AuthError';
  }
}

export const createOrgAccount = async (data: CreateOrgAccountType) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AuthError('Email already exists', 409);
    }

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

    if (!user.organization) {
      throw new AuthError('Organization creation failed', 500);
    }

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
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new AuthError('Failed to create organization account', 500);
  }
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
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { organization: true },
    });

    if (!user || user.role !== 'ORGANIZATION') {
      throw new AuthError('Invalid credentials', UNAUTHORIZED_REQUEST);
    }

    if (!user.organization) {
      throw new AuthError('Organization not found', UNAUTHORIZED_REQUEST);
    }

    const isValid = await compareValue(password, user.password);
    if (!isValid) {
      throw new AuthError('Invalid credentials', UNAUTHORIZED_REQUEST);
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
      org: {
        id: user.organization.id,
        name: user.organization.name,
        email: user.email,
        industry: user.organization.industry,
      },
      accessToken,
      refreshToken,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new AuthError('Failed to login', UNAUTHORIZED_REQUEST);
  }
};

export const refreshOrgAccessToken = async (refreshToken: string) => {
  try {
    const { payload } = verifyToken<{ sessionId: string }>(refreshToken, {
      secret: refreshTokenSignOptions.secret,
    });

    if (!payload) {
      throw new AuthError('Invalid Refresh Token', UNAUTHORIZED_REQUEST);
    }

    const now = Date.now();
    const session = await prisma.session.findUnique({
      where: { id: payload.sessionId },
      include: { user: true },
    });

    if (!session || session.expiresAt.getTime() <= now) {
      throw new AuthError('Session Expired', UNAUTHORIZED_REQUEST);
    }

    if (session.user.role !== 'ORGANIZATION') {
      throw new AuthError('Invalid session type', UNAUTHORIZED_REQUEST);
    }

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
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new AuthError('Failed to refresh token', UNAUTHORIZED_REQUEST);
  }
};
