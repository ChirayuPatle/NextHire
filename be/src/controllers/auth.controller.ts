// auth.controller.ts
import type { Request, Response } from 'express';

import { OK, UNAUTHORIZED_REQUEST } from '../configs/http-status-codes';
import { prisma } from '../configs/prisma';
import {
  createAccount,
  loginUser,
  refreshUserAccessToken,
} from '../services/candidate-auth.service';
import {
  createOrgAccount,
  loginOrg,
  refreshOrgAccessToken,
} from '../services/org-auth.service';
import appAssert from '../utils/app-assert';
import catchErrors from '../utils/catch-errors';
import {
  clearAuthCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthCookie,
} from '../utils/cookies';
import { verifyToken } from '../utils/jwt';
import {
  LoginCandidateSchema,
  LoginOrgSchema,
  RegisterCandidateSchema,
  RegisterOrgSchema,
} from './auth.schemas';

const registerCandidateHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = RegisterCandidateSchema.parse({
      ...req.body,
      userAgent: req.headers['user-agent'],
    });

    const { accessToken, refreshToken, user } = await createAccount(request);

    return setAuthCookie({ res, accessToken, refreshToken })
      .status(OK)
      .json(user);
  },
);

const loginCandidateHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = LoginCandidateSchema.parse({
      ...req.body,
      userAgent: req.headers['user-agent'],
    });

    const { accessToken, refreshToken, user } = await loginUser(request);

    return setAuthCookie({ res, accessToken, refreshToken })
      .status(OK)
      .json({ message: 'Login Successful', user });
  },
);

const logoutCandidateHandler = catchErrors(
  async (req: Request, res: Response) => {
    const accessToken = req.cookies.accessToken;
    const { payload } = verifyToken(accessToken);

    if (payload) {
      await prisma.session.delete({
        where: { id: (payload as { sessionId: number }).sessionId },
      });
    }

    return clearAuthCookies(res).status(OK).json({
      message: 'Successfully Logged Out',
    });
  },
);

const refreshCandidateHandler = catchErrors(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    appAssert(refreshToken, UNAUTHORIZED_REQUEST, 'Missing Refresh Token');

    const { accessToken, newRefreshToken } = await refreshUserAccessToken(
      refreshToken,
    );

    if (newRefreshToken) {
      res.cookie(
        'refreshToken',
        newRefreshToken,
        getRefreshTokenCookieOptions(),
      );
    }

    return res
      .status(OK)
      .cookie('accessToken', accessToken, getAccessTokenCookieOptions())
      .json({ message: 'Access Token Refreshed' });
  },
);

// Organization Handlers
const registerOrgHandler = catchErrors(async (req: Request, res: Response) => {
  const request = RegisterOrgSchema.parse({
    ...req.body,
  });

  const { accessToken, refreshToken, org } = await createOrgAccount(request);

  return setAuthCookie({ res, accessToken, refreshToken }).status(OK).json(org);
});

const loginOrgHandler = catchErrors(async (req: Request, res: Response) => {
  const request = LoginOrgSchema.parse({
    ...req.body,
    userAgent: req.headers['user-agent'],
  });

  const { accessToken, refreshToken, org } = await loginOrg(request);

  return setAuthCookie({ res, accessToken, refreshToken })
    .status(OK)
    .json({ message: 'Login Successful', org });
});

const logoutOrgHandler = catchErrors(async (req: Request, res: Response) => {
  const accessToken = req.cookies.accessToken;
  const { payload } = verifyToken(accessToken);

  if (payload) {
    await prisma.session.delete({
      where: { id: (payload as { sessionId: number }).sessionId },
    });
  }

  return clearAuthCookies(res).status(OK).json({
    message: 'Successfully Logged Out',
  });
});

const refreshOrgHandler = catchErrors(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  appAssert(refreshToken, UNAUTHORIZED_REQUEST, 'Missing Refresh Token');

  const { accessToken, newRefreshToken } = await refreshOrgAccessToken(
    refreshToken,
  );

  if (newRefreshToken) {
    res.cookie('refreshToken', newRefreshToken, getRefreshTokenCookieOptions());
  }

  return res
    .status(OK)
    .cookie('accessToken', accessToken, getAccessTokenCookieOptions())
    .json({ message: 'Access Token Refreshed' });
});

export {
  loginCandidateHandler,
  loginOrgHandler,
  logoutCandidateHandler,
  logoutOrgHandler,
  refreshCandidateHandler,
  refreshOrgHandler,
  registerCandidateHandler,
  registerOrgHandler,
};
