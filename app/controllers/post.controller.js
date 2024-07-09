import { PostDatamapper } from "../datamappers/index.datamapper.js";
import CoreController from "./core.controller.js";
import ApiError from "../errors/api.errors.js";

export default class PostController extends CoreController{
  static entityName = 'Post';
  static mainDatamapper = PostDatamapper;

  static async createpost(req, res, next) {
    try {
      const input = req.body;
      const post = await this.mainDatamapper.create(input);

      return res.status(201).json({ data: post, message: `Post ${post.id} created` });
    } catch (error) {
      console.error(error);
      return next(new ApiError());

    }
  }

  static async findByUserId(req, res){
    const { userId } = req.params;
    try {
      const rows = await this.mainDatamapper.findByUserId(userId);

      if (!rows) {
        throw new ApiError('Posts not found', 404, 'NOT_FOUND');
      };

      return res.json( rows );
    } catch (error) {
      console.error(error);
      throw new ApiError();
    }
  }

  static async showPosts(req, res){
    try {
      const rows = await this.mainDatamapper.getPostsWithProfils();

      if (!rows) {
        throw new ApiError('Posts not found', 404, 'NOT_FOUND');
      };
      return res.json( rows );
    } catch (error) {
      console.error(error);
      throw new ApiError();
    }
  }

}
