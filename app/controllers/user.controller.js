import { UserDatamapper } from "../datamappers/index.datamapper.js";
import CoreController from "./core.controller.js";
import ApiError from "../errors/api.errors.js";
import jwt from 'jsonwebtoken';

export default class UserController extends CoreController{
  static entityName = 'Users';
  static mainDatamapper = UserDatamapper;

  static async getLogUser (req, res, next){
    const {email, password} = req.body;
    const result = await UserDatamapper.findUser(email, password);
    if(!result){
      return next(new ApiError(`${this.entityName} not found`, {status: 404}));
    };

    const token = jwt.sign({email} , process.env.TOKEN_SECRET, { expiresIn: '2h' });
    res.send({ token });
  }

  static async createAccount(req, res){
    try {
      const input = req.body;

      // Validation simple des entrées
      if (!input.firstname || !input.lastname || !input.email || !input.password || !input.city || !input.birth_date) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const user = await UserDatamapper.createUser(input);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Unable to create account' });
    }
  }
}
