// prefix: /sessions

import { Router } from 'express';
import {
  createSessionHandler,
  getOrganizationSessionsHandler,
  getSessionByIdHandler,
} from '../controllers/session.controller';
import { createRoundHandler } from '../controllers/round.controller';

const sessionRouter = Router();

sessionRouter.post('/', createSessionHandler);

sessionRouter.get('/', getOrganizationSessionsHandler);

sessionRouter.get('/:id', getSessionByIdHandler);

sessionRouter.post('/:sessionId/rounds', createRoundHandler);

export default sessionRouter;
