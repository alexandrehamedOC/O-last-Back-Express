import express from 'express';
import UserController from '../controllers/user.controller.js';

const router = express.Router();


router.route('/login')
  .post(UserController.getLogUser.bind(UserController));

export default router;
