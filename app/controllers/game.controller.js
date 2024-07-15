import { GameDatamapper } from "../datamappers/index.datamapper.js";
import CoreController from "./core.controller.js";

export default class GameController extends CoreController {
  static entityName = "Game";
  static mainDatamapper = GameDatamapper;

  static async getPostsByGame(req, res) {
    const { id } = req.params;
    try {
      const result = await this.mainDatamapper.getPostsByGame(id);
      return res.status(200).json(result);
    } catch (error) {
      res.status(500)
      res.render('error',{error : error});
    }
  }
}
