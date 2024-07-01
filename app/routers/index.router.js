import { Router } from 'express';
import postRouter from './postRouter.js'

export const router = Router();

router.use('/api/v1', postRouter);

export default router;