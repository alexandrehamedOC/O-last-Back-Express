import { RateDatamapper } from "../datamappers/index.datamapper.js";
import CoreController from "./core.controller.js";

export default class PostController extends CoreController{
  static entityName = 'Rate';
  static mainDatamapper = RateDatamapper;

  static async getRatesByUser(req, res) {
    const {userId } = req.params;

    const rates = await this.mainDatamapper.getAllByUser(userId);

    return res.json({ data: rates });

  }

}
