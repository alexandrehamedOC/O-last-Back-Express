import CoreDatamapper from './core.datamapper.js';

export default class PostDatamapper extends CoreDatamapper {
  static tableName = 'post';

  static async findByUserId(userId) {
    const result = await this.client.query(
      `
        SELECT * FROM "${this.tableName}"
        JOIN "users" ON "${this.tableName}"."user_id" = "users"."id"
        WHERE "users"."id" = $1
        `,
      [userId],
    );
    const { rows } = result;
    return rows;
  }

  static async getPostsWithProfils() {
    const result = await this.client.query(
      `
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
        FROM "${this.tableName}"
        JOIN "profil" ON "${this.tableName}"."profil_id" = "profil"."id"
        JOIN "users" ON "profil"."user_id" = "users"."id"
        JOIN "game" ON "${this.tableName}"."game_id" = "game"."id"
        `,
    );
    const { rows } = result;
    return rows;
  }
}
