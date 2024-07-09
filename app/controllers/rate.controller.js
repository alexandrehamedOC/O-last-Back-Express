import { RateDatamapper } from "../datamappers/index.datamapper.js";
import CoreController from "./core.controller.js";
import ApiError from "../errors/api.errors.js";

export default class PostController extends CoreController{
  static entityName = 'Rate';
  static mainDatamapper = RateDatamapper;

  static async createRate(req, res) {
    try{
      const rate = await this.mainDatamapper.create(req.body);

      return res.json({ data: rate });
    } catch (error) {
      console.error(error);
      throw new ApiError();
    }
  }

  static async getRatesByUser(req, res) {
    const {userId } = req.params;
    const {itemsByPage, page} = req.query;

    const itemsPerPage = Number(itemsByPage);
    const currentPage = Number(page);


    try {
      const rates = await this.mainDatamapper.getAllByUser(userId, itemsPerPage, currentPage);

      if (!rates) {
        throw new ApiError('Rates not found', 404, 'NOT_FOUND');
      }

      return res.json( rates );
    }
    catch (error) {
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  }

}
