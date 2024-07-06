import { RateDatamapper } from "../datamappers/index.datamapper.js";
import CoreController from "./core.controller.js";
import ApiError from "../errors/api.errors.js";

export default class PostController extends CoreController{
  static entityName = 'Rate';
  static mainDatamapper = RateDatamapper;

  static async getRatesByUser(req, res) {
    const {userId } = req.params;

    try {
      const rates = await this.mainDatamapper.getAllByUser(userId);

      if (!rates) {
        throw new ApiError('Rates not found', 404, 'NOT_FOUND   ');
      }

      return res.json( rates );
    }
    catch (error) {
      console.error(error);
      throw new ApiError();
    }
  }

}
