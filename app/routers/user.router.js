import express from "express";
import UserController from "../controllers/user.controller.js";
import { userSchema } from "../utils/validationSchemas.js";
import validationMiddleware from "../middleware/validation.middleware.js"; // Assurez-vous que le chemin est correct

const router = express.Router();

router.route("/")
  .get(UserController.getAll.bind(UserController))
  .post(
    validationMiddleware(userSchema), // Utilisez la méthode statique directement
    UserController.createAccount.bind(UserController),
  );

router.route("/:id")
  .get(UserController.getOne.bind(UserController))
  .delete(UserController.delete.bind(UserController))
  .patch(
    validationMiddleware(userSchema), // Utilisez la méthode statique directement
    UserController.update.bind(UserController),
  );

router.route("/:id/details")
  .get(UserController.getUserDetails.bind(UserController));

export default router;
