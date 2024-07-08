import { PostDatamapper } from "../datamappers/index.datamapper.js";
import CoreController from "./core.controller.js";
import { postSchema } from "../utils/validationSchemas.js";
import ApiError from "../errors/api.errors.js";

export default class PostController extends CoreController{
  static entityName = 'Post';
  static mainDatamapper = PostDatamapper;

  static async createpost(req, res, next) {
    try {
      const { error } = postSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details });
      }

      const input = req.body;
      const post = await this.mainDatamapper.create(input);
      return res.status(201).json({ data: post });
    } catch (error) {
      console.error(error);
      return next(new ApiError('Internal server error', { status: 500 }));
    }
  }

  static async findByUserId(req, res){
    const { userId } = req.params;
    const rows = await this.mainDatamapper.findByUserId(userId);
    return res.json( rows );
  }

}
