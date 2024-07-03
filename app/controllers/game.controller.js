import { GameDatamapper } from "../datamappers/index.datamapper.js";
import CoreController from "./core.controller.js";

export default class GameController extends CoreController{
  static entityName = 'Game';
  static mainDatamapper = GameDatamapper;

}
