import express from 'express';
import RateController from '../controllers/rate.controller.js';


const router = express.Router();

router.route('/rates')
  .get(RateController.getAll.bind(RateController))
  .post(RateController.create.bind(RateController));

router.route('/rates/:id')
  .get(RateController.getOne.bind(RateController))
  .patch(RateController.update.bind(RateController))
  .delete(RateController.delete.bind(RateController));

router.route('/rates/user/:userId')
  .get(RateController.getRatesByUser.bind(RateController));

export default router;
