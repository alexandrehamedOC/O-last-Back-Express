import e from 'express';
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

  static async create(post) {
    const elements = [];
    const values = [];
    let index = 1;
    for (const key in post) {
      elements.push(key);
      values.push(`$${index}`);
      index++;
    }
    const result = await this.client.query(
      `
        INSERT INTO "${this.tableName}" (${elements.join(', ')})
        VALUES (${values.join(', ')})
        RETURNING *
        `,
      Object.values(post)
    );
    const { rows } = result;
    return rows[0];
  }

  static async update(post, id) {
    const elements = Object.entries(post)
      .map(([key, value]) => `"${key}" = '${value}'`)
      .join(', ');

    console.log(`UPDATE "${this.tableName}" 
    SET ${elements} 
    WHERE id=$1`);

    const result = await this.client.query(
      `UPDATE "${this.tableName}" 
            SET ${elements}
            WHERE id=$1
            RETURNING *`,
      [id]
    );

    const { rows } = result;
    return rows[0];
  }

  static async delete(id) {
    await this.client.query(`DELETE FROM "${this.tableName}" WHERE id = $1`, [
      id,
    ]);
  }
}
