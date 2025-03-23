// prefix: /auth

import { Router } from 'express';
import {
  loginCandidateHandler,
  logoutCandidateHandler,
  refreshCandidateHandler,
  registerCandidateHandler,
  loginOrgHandler,
  logoutOrgHandler,
  refreshOrgHandler,
  registerOrgHandler,
} from '../controllers/auth.controller';

const authRouter = Router();

// Candidate Routes
authRouter.post('/candidate/register', registerCandidateHandler);
authRouter.post('/candidate/login', loginCandidateHandler);
authRouter.get('/candidate/logout', logoutCandidateHandler);
authRouter.get('/candidate/refresh', refreshCandidateHandler);

// Org Routes
authRouter.post('/org/register', registerOrgHandler);
authRouter.post('/org/login', loginOrgHandler);
authRouter.get('/org/logout', logoutOrgHandler);
authRouter.get('/org/refresh', refreshOrgHandler);

export default authRouter;
