import express from "express";
import ProfilController from "../controllers/profil.controller.js";

import validationMiddleware from "../middleware/validation.middleware.js";
import { profilSchema } from "../utils/validationSchemas.js";
const router = express.Router();

router.route("/profil")
  .get(ProfilController.getAll.bind(ProfilController))
  .post(
    validationMiddleware(profilSchema),
    ProfilController.create.bind(ProfilController));

router.route("/profil/:id")
  .get(ProfilController.getOne.bind(ProfilController))
  .put(
    validationMiddleware(profilSchema),
    ProfilController.update.bind(ProfilController))
  .delete(ProfilController.delete.bind(ProfilController));

export default router;
