import CoreDatamapper from './core.datamapper.js';

export default class GameDatamapper extends CoreDatamapper {
  static tableName = 'game';

  static async getPostsByGame(id){
    const result = await this.client.query('SELECT * FROM post WHERE game_id = $1', [id]);
    const {rows} = result;
    return rows;
  }

}
