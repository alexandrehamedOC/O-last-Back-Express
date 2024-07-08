import { ProfilDatamapper } from "../datamappers/index.datamapper.js";
import CoreController from "./core.controller.js";
import { profilSchema } from "../utils/validationSchemas.js";
import ApiError from "../errors/api.errors.js";


export default class ProfilController extends CoreController {
  static entityName = "Profil";
  static mainDatamapper = ProfilDatamapper;
  static validateSchema = profilSchema;

  static async getProfilsByUserId(req, res) {
    const { userId } = req.params;
    try {
      const profils = await this.mainDatamapper.profilsByUserId(userId);

      if (!profils) {
        throw new ApiError("Profils not found", 404, "NOT_FOUND");
      }

      return res.json(profils);
    } catch (error) {
      console.error(error);
      throw new ApiError();
    }
  }
}
