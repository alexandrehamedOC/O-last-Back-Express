import express from 'express';
import GameController from '../controllers/game.controller.js';


const router = express.Router();

router.route('/games')
  .get(GameController.getAll.bind(GameController));

router.route('/games/:id')
  .get(GameController.getOne.bind(GameController));

export default router;
