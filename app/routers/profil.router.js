import express from "express";
import ProfilController from "../controllers/profil.controller.js";

const router = express.Router();

router.route("/profil")
  .get(ProfilController.getAll.bind(ProfilController))
  .post(ProfilController.create.bind(ProfilController));

router.route("/profil/:id")
  .get(ProfilController.getOne.bind(ProfilController))
  .put(ProfilController.update.bind(ProfilController))
  .delete(ProfilController.delete.bind(ProfilController));

export default router;
