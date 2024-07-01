import { Router } from 'express';
import userRouter from './user.router.js'

export const router = Router();

router.use((_, res, next) => {
    res.returnFormat = 'json';
    next();
  });

  /**
   * 
   * @route  GET /api/v1/users
   * 
   */
  router.use('/users', userRouter);

  export default router;