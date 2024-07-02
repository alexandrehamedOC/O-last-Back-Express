import { Router } from 'express';
import rateRouter from './rateRouter.js';

export const router = Router();

router.use('/api/v1', rateRouter);

export default router;
