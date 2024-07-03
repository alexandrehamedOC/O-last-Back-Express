import { ProfilDatamapper, UserDatamapper, PostDatamapper, RateDatamapper } from "../datamappers/index.datamapper.js";
import CoreController from "./core.controller.js";
import ApiError from "../errors/api.errors.js";
import jwt from 'jsonwebtoken';

export default class UserController extends CoreController{
  static entityName = 'Users';
  static mainDatamapper = UserDatamapper;

  static async getLogUser (req, res, next){
    console.log(req.body);
    const {email, password} = req.body;
    console.log(email, password);
    const result = await UserDatamapper.findUser(email, password);
    if(!result){
      return next(new ApiError(`${this.entityName} not found`, {status: 404}));
    };

    const token = jwt.sign({email} , process.env.TOKEN_SECRET, { expiresIn: '2h' });
    res.send({ token });
  }

  static async getUserDetails(req, res, next){
    const {id} = req.params;
    try {
      const user = await UserDatamapper.findByPk(id);
      if(!user){
        return next(new ApiError(`${this.entityName} not found`, {status: 404}));
      }
      const profiles = await ProfilDatamapper.findByUserId(id);
      const posts = await PostDatamapper.findByUserId(id);
      const rate = await RateDatamapper.getAllByUser(id);
      return res.json({user, profiles, posts, rate});
    } catch (error) {
      console.error(error);
      return next(new ApiError('Internal server error', {status: 500}));
    }
  }

  static async getUserProfiles(req, res, next){
    const {id} = req.params;
    try {
      const profiles = await ProfilDatamapper.findByUserId(id);
      if(!profiles){
        return next(new ApiError(`${this.entityName} npm`, {status: 404}));
      }
      return res.json({data: profiles});
    } catch (error) {
      console.error(error);
      return next(new ApiError('Internal server error', {status: 500}));
    }
  }
}
