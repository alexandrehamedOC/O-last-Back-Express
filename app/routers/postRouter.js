import { Router } from "express";
export const router = Router();

import PostController from "../controllers/post.controller.js";

router
.get('/posts', PostController.showAll)
.get('/posts/:id', PostController.showOne)
.get('/posts/user/:id', PostController.showPostsByUser);

router.delete('/posts/:id', PostController.deletePost);