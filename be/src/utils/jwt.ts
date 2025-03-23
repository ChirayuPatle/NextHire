import jwt from 'jsonwebtoken';
import type { SignOptions, Secret } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-key';

export interface TokenPayload {
  userId?: string;
  sessionId: string;
  [key: string]: unknown;
}

export interface RefreshTokenPayload {
  sessionId: string;
}

export interface JWTOptions extends SignOptions {
  secret?: Secret;
}

export const refreshTokenSignOptions: JWTOptions = {
  expiresIn: '30d',
  secret: REFRESH_TOKEN_SECRET,
};

export const defaultSignOptions: JWTOptions = {
  expiresIn: '15m',
  secret: JWT_SECRET,
};

export const signToken = (
  payload: TokenPayload,
  options: JWTOptions = defaultSignOptions,
) => {
  const { secret, ...signOptions } = options;
  return jwt.sign(payload, secret || JWT_SECRET, signOptions);
};

export const verifyToken = <T extends TokenPayload>(
  token: string,
  options: JWTOptions = defaultSignOptions,
) => {
  try {
    const { secret, ...verifyOptions } = options;
    const payload = jwt.verify(token, secret || JWT_SECRET, verifyOptions) as T;
    return { payload, expired: false };
  } catch (error) {
    return {
      payload: null,
      expired: (error as Error).message === 'jwt expired',
    };
  }
};
