import jwt, { type SignOptions, type VerifyOptions } from 'jsonwebtoken';
import env from '../configs/env-config';

export type RefreshTokenPayload = {
  sessionId: number; // Changed from Mongoose's ObjectId to number (Prisma's default ID type)
};

export type AccessTokenPayload = {
  userId: number; // Changed from Mongoose's ObjectId to number (Prisma's default ID type)
  sessionId: number; // Changed from Mongoose's ObjectId to number (Prisma's default ID type)
};

type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ['user'],
};

const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: '15m',
  secret: env.JWT_SECRET,
};

export const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: '30d',
  secret: env.JWT_REFRESH_SECRET,
};

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: SignOptionsAndSecret,
) => {
  const { secret, ...signOpts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, {
    ...defaults,
    ...signOpts,
  });
};

export const verifyToken = <TPayload extends Object = AccessTokenPayload>(
  token: string,
  options?: VerifyOptions & {
    secret: string;
  },
) => {
  const { secret = env.JWT_SECRET, ...verifyOpts } = options || {};

  try {
    const payload = jwt.verify(token, secret, {
      ...defaults,
      ...verifyOpts,
    }) as TPayload;
    return {
      payload,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
