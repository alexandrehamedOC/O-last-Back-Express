import express from 'express';
import RateController from '../controllers/rate.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import validationMiddleware from '../middleware/validation.middleware.js';
import { rateSchema } from '../utils/validationSchemas.js';

const router = express.Router();

router.route('/rates')
  .get(RateController.getAll.bind(RateController))
  .post(
    validationMiddleware(rateSchema),
    RateController.createRate.bind(RateController));

router.route('/rates/:id')
  .get(RateController.getOne.bind(RateController))
  .patch(
    validationMiddleware(rateSchema),
    RateController.update.bind(RateController))
  .delete(authMiddleware.verifyToken, RateController.delete.bind(RateController));

router.route('/rates/user/:userId')
  .get(RateController.getRatesByUser.bind(RateController));

export default router;
