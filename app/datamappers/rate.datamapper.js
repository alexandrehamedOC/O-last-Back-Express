import CoreDatamapper from './core.datamapper.js';

export default class RateDatamapper extends CoreDatamapper {
  static tableName = 'rate';

  static async getAllByUser(userId, itemsPerPage= 40, currentPage = 0) {
    const offset = currentPage * itemsPerPage;
    const { rows } = await this.client.query(
      `
      SELECT 
        "rate"."id" as "rate_id", 
        "users"."id" as "user_id",
        "note", 
        "rate"."description" as "rate_description", 
        "users"."firstname" as "user_firstname",
        "users"."lastname" as "user_lastname",  
        "game"."name" as "game_name", 
        "profil"."description" as "profil_description",
        "profil"."rank" as "profil_rank",
        "profil"."level" as "profil_level",
        "rate"."sender_user_id" as "rate_sender_user_id"
      FROM "users"
      JOIN "profil" ON "profil"."user_id" = "users"."id"
      JOIN "rate" ON "profil"."id" = "rate"."receiver_profil_id"
      JOIN "game" ON "profil"."game_id" = "game"."id"
      WHERE "users"."id" =$1
      ORDER BY "note" DESC
      LIMIT $2 OFFSET $3;
      `,
      [userId, itemsPerPage, offset],
    );
    return rows;
  }
  
}
