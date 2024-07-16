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
    const { itemsByPage, page } = req.query;
    const game_id = req.query.game_id;
    console.log('ici', req.query);

    const itemsPerPage = Number(itemsByPage) && Number(itemsByPage) > 0 ? Number(itemsByPage) : 50;
    const currentPage = Number(page) && Number(page) >= 0 ? Number(page) : 0;
    try {
      const rows = await this.mainDatamapper.getPostsWithProfils(itemsPerPage, currentPage, game_id);

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
