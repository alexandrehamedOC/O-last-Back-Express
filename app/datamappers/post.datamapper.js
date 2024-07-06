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
}
