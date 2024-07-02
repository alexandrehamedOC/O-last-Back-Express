import { PostDatamapper } from "../datamappers/index.datamapper.js";
import CoreController from "./core.controller.js";

export default class PostController extends CoreController{
  static entityName = 'Post';
  static mainDatamapper = PostDatamapper;

  static async findByUserId(req, res){
    const { userId } = req.params;
    const rows = await this.mainDatamapper.findByUserId(userId);
    return res.json({ data: rows });
  }
}
