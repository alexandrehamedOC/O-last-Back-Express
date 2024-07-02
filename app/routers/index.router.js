import { Router } from 'express';
import gameRouter from './gameRouter.js';

export const router = Router();

router.use('/api/v1', gameRouter);

export default router;
