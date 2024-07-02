import { ProfilDatamapper } from "../datamappers/index.datamapper.js";
import CoreController from "./core.controller.js";

export default class ProfilController extends CoreController {
  static entityName = "Profil";
  static mainDatamapper = ProfilDatamapper;
}
