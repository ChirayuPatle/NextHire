// prefix: /ai
import { Router } from 'express';
import { chatHandler } from '../controllers/geminiai.controller';

const router = Router();

router.post('/chat', chatHandler);

export default router;
