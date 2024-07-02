import { Router } from 'express';
import postRouter from './postRouter.js';
import gameRouter from './gameRouter.js';

export const router = Router();

router.use('/api/v1', postRouter);
router.use('/api/v1', gameRouter);

export default router;
