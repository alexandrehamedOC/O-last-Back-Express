import CoreDatamapper from './core.datamapper.js';

export default class PostDatamapper extends CoreDatamapper {
  static tableName = 'post';

  static async findByUserId(userId) {
    const result = await this.client.query(
      `
        SELECT * FROM "${this.tableName}"
        JOIN "user" ON "${this.tableName}"."user_id" = "user"."id"
        WHERE "user"."id" = $1
        `,
      [userId]
    );
    const { rows } = result;
    return rows;
  }
}
