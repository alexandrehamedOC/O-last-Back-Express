import CoreDatamapper from './core.datamapper.js';

export default class RateDatamapper extends CoreDatamapper {
  static tableName = 'rate';

  static async getAllByUser(userId) {
    const { rows } = await this.client.query(
      `
      SELECT 
"rate"."id" as "rate_id", 
"note", 
"rate"."description" as "rate_description", 
"user"."firstname" as "user_firstname",
"user"."lastname" as "user_lastname",  
"game"."name" as "game_name", 
"profil"."description" as "profil_description",
"profil"."rank" as "profil_rank",
"profil"."level" as "profil_level",
"rate"."sender_user_id" as "rate_sender_user_id"
FROM "${this.tableName}"
JOIN "profil" ON "profil"."id" = "rate"."receiver_profil_id"
JOIN "user" ON "profil"."user_id" = "user"."id"
JOIN "game" ON "profil"."game_id" = "game"."id"
WHERE "rate"."receiver_profil_id" =$1;
      `,
      [userId],
    );
    return rows[0];
  }
}
