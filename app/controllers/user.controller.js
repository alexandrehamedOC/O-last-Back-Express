import { UserDatamapper } from "../datamappers/index.datamapper.js";
import CoreController from "./core.controller.js";
import ApiError from "../errors/api.errors.js";
import jwt from 'jsonwebtoken';

export default class UserController extends CoreController{
    static entityName = 'Users';
    static mainDatamapper = UserDatamapper;

    static async getLogUser (req,res){
        const {email, password} = req.body;
        const result = await UserDatamapper.findUser(email, password);
        // if(!result){
        //     return next(new ApiError(`${this.entityName} not found`, {status: 404}));
        // };

        const token = jwt.sign(email , process.env.TOKEN_SECRET, { expiresIn: '24h' });
        res.send({ token }).json({jwtoken: token, user: {result}});
    }
}