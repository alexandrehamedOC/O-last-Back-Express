import UserDatamapper from "../datamappers/user.datamapper";
import CoreController from "./core.controller";

export default class UserController extends CoreController{
    static entityName = 'User';
    static mainDatamapper = UserDatamapper;

    
}