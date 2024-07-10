import CoreDatamapper from './core.datamapper.js';

// app/datamappers/profil.datamapper.js

export default class ProfilDatamapper extends CoreDatamapper {
  static tableName = 'profil';

  static async profilsByUserId(userId) {
    const { rows } = await this.client.query(
      `
  SELECT
    "profil"."id",
  	"profil"."name",
  	"profil"."description",
  	"profil"."rank",
  	"profil"."level",
 	  "game"."name" as "game_name",
    "game"."id" as "game_id"
  FROM "profil"
  JOIN "game" ON "game"."id" = "profil"."game_id"
  WHERE "user_id"=$1;
      `,
      [userId],
    );

    return rows;
  }
}
