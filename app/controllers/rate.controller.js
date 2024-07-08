import { RateDatamapper } from "../datamappers/index.datamapper.js";
import CoreController from "./core.controller.js";
import { rateSchema } from "../utils/validationSchemas.js";

export default class PostController extends CoreController{
  static entityName = 'Rate';
  static mainDatamapper = RateDatamapper;

  static async createRate(req, res) {
    const { error } = rateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details });
    }
    const rate = await this.mainDatamapper.create(req.body);

    return res.json({ data: rate });
  }

  static async getRatesByUser(req, res) {
    const {userId } = req.params;

    const rates = await this.mainDatamapper.getAllByUser(userId);

    return res.json( rates );

  }

}
