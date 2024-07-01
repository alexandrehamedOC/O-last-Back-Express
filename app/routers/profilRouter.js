import { Router } from "express";
import ProfilController from "../controllers/profil.controller.js";

const router = Router();

router.post("/profil", ProfilController.createProfil);

router.get("/profil", ProfilController.getAllProfils);
router.get("/profil/:id", ProfilController.getProfilById);
router.put("/profil/:id", ProfilController.updateProfil);
router.delete("/profil/:id", ProfilController.deleteProfil);
export default router;
