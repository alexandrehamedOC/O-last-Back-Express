import { UserDatamapper } from "../datamappers/index.datamapper.js";
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
}
