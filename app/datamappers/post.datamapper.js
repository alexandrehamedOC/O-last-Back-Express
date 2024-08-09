import CoreDatamapper from './core.datamapper.js';

export default class PostDatamapper extends CoreDatamapper {
  static tableName = 'post';

  static async findByUserId(userId) {
    const result = await this.client.query(
      // todo : refine with select only needed fields
      `
       SELECT 
        "post"."id" as "post_id",  
        "post"."title" as "post_title",
        "post"."platform" as "post_platform",
        "post"."description" as "post_description",
        "post"."schedule_start" as "post_schedule_start",
        "post"."schedule_end" as "post_schedule_end",
        "post"."status" as "post_status",
        "profil"."id" as "profil_id",
        "profil"."rank" as "profil_rank",
        "profil"."level" as "profil_level",
        "game"."name" as "game_name",
        "users"."id" as "user_id"
      FROM "post"
      JOIN "profil" ON "post"."profil_id" = "profil"."id"
      JOIN "game" ON "game"."id" = "post"."game_id"
      JOIN "users" ON "profil"."user_id" = "users"."id"
      WHERE "users"."id" =$1
        `,
      [userId],
    );
    const { rows } = result;
    return rows;
  }

  static async getPostsWithProfils(itemsPerPage, currentPage, game_id) {
    const offset = itemsPerPage * currentPage;

    let query =`
          SELECT
          "post"."id" as "post_id",  
          "post"."title" as "post_title",
          "post"."platform" as "post_platform",
          "post"."description" as "post_description",
          "post"."schedule_start" as "post_schedule_start",
          "post"."schedule_end" as "post_schedule_end",
          "post"."status" as "post_status",
          "game"."name" as "game_name",
          "profil"."rank" as "profil_rank",
          "profil"."level" as "profil_level",
          "post"."profil_id" as "profil_id",
          "post"."game_id" as "game_id",
          "users"."id" as "user_id"
      FROM "post"
      JOIN "profil" ON "post"."profil_id" = "profil"."id"
      JOIN "users" ON "profil"."user_id" = "users"."id"
      JOIN "game" ON "post"."game_id" = "game"."id"
    `;

    const params = [];
    if (game_id !== undefined && game_id !== null) {
      query += ` WHERE "post"."game_id" = $${params.length + 1}`;
      params.push(game_id);
    }

    query += `
    ORDER BY "post"."schedule_start" ASC 
    LIMIT $${params.length + 1} OFFSET $${params.length + 2}
  `;

    params.push(itemsPerPage, offset);

    const result = await this.client.query(query, params);
    const { rows } = result;
    return rows;
  }
}
