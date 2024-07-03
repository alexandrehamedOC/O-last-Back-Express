import express from 'express';
import PostController from '../controllers/post.controller.js';


const router = express.Router();

router.route('/posts')
  .get(PostController.getAll.bind(PostController))
  .post(PostController.create.bind(PostController));

router.route('/posts/:id')
  .get(PostController.getOne.bind(PostController))
  .patch(PostController.update.bind(PostController))
  .delete(PostController.delete.bind(PostController));

router.route('/posts/user/:userId')
  .get(PostController.findByUserId.bind(PostController));

export default router;
