import UserDatamapper from "../datamappers/index.datamapper.js";
import CoreController from "./core.controller.js";

export default class UserController extends CoreController{
    static entityName = 'users';
    static mainDatamapper = UserDatamapper;

}