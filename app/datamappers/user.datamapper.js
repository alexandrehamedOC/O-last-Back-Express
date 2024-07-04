import CoreDatamapper from './core.datamapper.js';

export default class UserDatamapper extends CoreDatamapper {

  static tableName = 'users';

  static async findUser (email, password){
    const result = await this.client.query(`SELECT * FROM "users" WHERE "email" =$1 AND password =$2`,[email, password]);
    const {rows} = result;
    return rows[0];
  }

  static async userDetails(id) {
    const { rows } = await this.client.query(
      `
      SELECT * FROM ${this.tableName}
      JOIN "post" ON "post"."user_id" = "users"."id"
      JOIN "game" ON "game"."id" = "post"."game_id"
      JOIN "profil" ON "users"."id" = "profil"."user_id"
      JOIN "rate" ON "rate"."receiver_profil_id" = "profil"."id"
      WHERE "users"."id" = $1
      `, [id]);

    return rows;
  }

}
