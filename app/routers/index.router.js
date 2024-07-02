import { Router } from 'express';
import postRouter from './postRouter.js';
import gameRouter from './gameRouter.js';
import rateRouter from './rateRouter.js';
import userRouter from './user.router.js'


export const router = Router();

router.use('/api/v1', postRouter);
router.use('/api/v1', gameRouter);
router.use('/api/v1', rateRouter);
router.use('/api/v1/users', userRouter);
export default router;
