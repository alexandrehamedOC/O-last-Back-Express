import express from 'express';
import PostController from '../controllers/post.controller.js';
import { postSchema } from '../utils/validationSchemas.js';
import validationMiddleware from '../middleware/validation.middleware.js';


const router = express.Router();

router.route('/posts')
  .get(PostController.getAll.bind(PostController))
  .post(
    validationMiddleware(postSchema),
    PostController.createpost.bind(PostController));

router.route('/posts/:id')
  .get(PostController.getOne.bind(PostController))
  .patch(
    validationMiddleware(postSchema),
    PostController.update.bind(PostController))
  .delete(PostController.delete.bind(PostController));

router.route('/posts/user/:userId')
  .get(PostController.findByUserId.bind(PostController));

export default router;
