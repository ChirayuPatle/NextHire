import { Router } from 'express';
import { codeGenerationHandler } from '../controllers/code.controllers';

const codeSandBoxRouter = Router();

codeSandBoxRouter.post('/create-sandbox', codeGenerationHandler);

export default codeSandBoxRouter;
