import CoreDatamapper from './core.datamapper.js';

// app/datamappers/profil.datamapper.js

export default class ProfilDatamapper extends CoreDatamapper {
  static tableName = 'profil';

  static async profilsByUserId(userId) {
    console.log("ici");
    const { rows } = await this.client.query(
      `
  SELECT
  	"profil"."name",
  	"profil"."description",
  	"profil"."rank",
  	"profil"."level",
 	  "game"."name" as "game_name" 
  FROM "profil"
  JOIN "game" ON "game"."id" = "profil"."game_id"
  WHERE "user_id"=$1;
      `,
      [userId],
    );

    return rows;
  }
}
