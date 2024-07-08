import { UserDatamapper } from "../datamappers/index.datamapper.js";
import { userSchema } from "../utils/validationSchemas.js";
import CoreController from "./core.controller.js";
import ApiError from "../errors/api.errors.js";
import jwt from 'jsonwebtoken';

export default class UserController extends CoreController{
  static entityName = 'Users';
  static mainDatamapper = UserDatamapper;
  static validateSchema = userSchema;

  static async getLogUser (req, res, next){
    const {email, password} = req.body;
    try {
      const result = await UserDatamapper.findUser(email, password);
      if(!result){
        return next(new ApiError(`${this.entityName} not found`, 404, 'NOT_FOUND'));
      };
      const token = jwt.sign({email} , process.env.TOKEN_SECRET, { expiresIn: '2h' });
      res.cookie('token', token, {httpOnly: true}).json({user: result.id});
      console.log(result);
      console.log(token);
    } catch (error) {
      console.error(error);
      return next(new ApiError());
    }
  }


  static async getUserDetails(req, res, next){
    const {id} = req.params;
    try {
      const details = await UserDatamapper.userDetails(id);
      if(!details){
        return next(new ApiError(`${this.entityName} not found`, 404, 'NOT_FOUND'));
      };

      return res.json({data: details});
    } catch (error) {
      console.error(error);
      return next(new ApiError());
    }
  }

  static async createAccount(req, res, next){
    try {
      const input = req.body;

      // Validation simple des entrées
      if (!input.firstname || !input.lastname || !input.email || !input.password || !input.city || !input.birth_date) {
        return next(new ApiError('All fields required', 400, 'BAD_REQUEST'));
      }

      const emailExist = await UserDatamapper.findByEmail(input.email);

      if(emailExist){
        return next(new ApiError('Email already exist', 400, 'BAD_REQUEST'));
      }

      const user = await UserDatamapper.createUser(input);
      return res.status(201).json(user);
    } catch (error) {
      console.error(error);
      return next(new ApiError());
    }
  }
}
