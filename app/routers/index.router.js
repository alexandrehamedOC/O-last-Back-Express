import express from 'express';
import userRouter from './user.router.js'

const router = express.Router();

router.use((_, res, next) => {
    res.returnFormat = 'json';
    next();
  });

  /**
   * 
   * @route  GET /api/v1/users
   * 
   */
  router.use('/api/v1/users', userRouter);

  export default router;