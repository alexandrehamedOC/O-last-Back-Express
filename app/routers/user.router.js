import express from "express";
import UserController from "../controllers/user.controller.js";

const router = express.Router();

router.route("/")
  .get(UserController.getAll.bind(UserController))
  .post(UserController.create.bind(UserController));

router.route("/:id")
  .get(UserController.getOne.bind(UserController))
  .delete(UserController.delete.bind(UserController))
  .patch(UserController.update.bind(UserController));



router.route("/:id/details")
  .get(UserController.getUserDetails.bind(UserController));

export default router;
