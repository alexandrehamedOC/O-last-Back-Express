import { Router } from 'express';
import { router as postRouter } from './postRouter.js';

export const router = Router();

router.use(postRouter);