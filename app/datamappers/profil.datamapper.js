import CoreDatamapper from "./core.datamapper.js";

// app/datamappers/profil.datamapper.js


export default class ProfilDatamapper extends CoreDatamapper {
  static tableName = 'profil';

  static async profilsByUserId(userId) {
    const result = await this.client.query(
      `
      SELECT * FROM "profil"
      JOIN "game" ON "game"."id" = "profil"."game_id"
      WHERE "user_id" =$1;
      `,
      [userId],
    );
    const { rows } = result;
    return rows;
  }

}


