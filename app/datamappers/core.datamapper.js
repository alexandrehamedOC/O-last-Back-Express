export default class CoreDatamapper {
  static tableName = null;

  static init(config) {
    this.client = config.client;
  }

  static async findAll() {
    const result = await this.client.query(`SELECT * FROM "${this.tableName}"`);
    const { rows } = result;
    return rows;
  }

  static async findByPk(id) {
    const result = await this.client.query(
      `SELECT * FROM "${this.tableName}" WHERE id = $1`,
      [id],
    );
    const { rows } = result;
    return rows[0];
  }

  static async create(input) {
    const columns = Object.keys(input).map((column) => `"${column}"`);
    const placeholders = Object.keys(input).map((_, index) => `$${index + 1}`);
    const values = Object.values(input);

    const result = await this.client.query(
      `
<<<<<<< HEAD
        INSERT INTO "${this.tableName}"
        (${columns})
        VALUES (${placeholders})
        RETURNING *
      `,
=======
          INSERT INTO "${this.tableName}"
          (${columns})
          VALUES (${placeholders})
          RETURNING *
        `,
>>>>>>> feature/ROUTESGAMES
      values,
    );
    return result.rows[0];
  }

  static async update(id, input) {
    const fieldPlaceholders = Object.keys(input).map(
      (column, index) => `"${column}" = $${index + 1}`,
    );
    const values = Object.values(input);

    const result = await this.client.query(
      `
<<<<<<< HEAD
        UPDATE ${this.tableName} SET
          ${fieldPlaceholders},
          updated_at = now()
        WHERE id = $${fieldPlaceholders.length + 1}
        RETURNING *
      `,
=======
          UPDATE ${this.tableName} SET
            ${fieldPlaceholders},
            updated_at = now()
          WHERE id = $${fieldPlaceholders.length + 1}
          RETURNING *
        `,
>>>>>>> feature/ROUTESGAMES
      [...values, id],
    );

    return result.rows[0];
  }

  static async delete(id) {
    const result = await this.client.query(
      `DELETE FROM ${this.constructor.tableName} WHERE id = $1`,
      [id],
    );

    return !!result.rowCount;
  }
}
