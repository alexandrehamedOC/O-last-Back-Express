import express from 'express';
import UserController from '../controllers/user.controller';


const router = express.Router();

router.route('/')
.get(UserController.getAll.bind(UserController));

export default router;