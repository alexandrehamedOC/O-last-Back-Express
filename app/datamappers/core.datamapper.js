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
      [id]
    );
    const { rows } = result;
    return rows[0];
  }
  async create(input) {
    const columns = Object.keys(input).map((column) => `"${column}"`);
    const placeholders = Object.keys(input).map((_, index) => `$${index + 1}`); // 0 => $1, 1 => $2
    const values = Object.values(input);

    /*
    columns ==> ['"label"', '"route"']
    explication : `${columns}` ==> columns.toString() ==> columns.join() ==> 'label,route'

    placeholders ==> ['$1', '$2']

    values ==> ['Angular','/angular']
    */

    const result = await this.client.query(`
      INSERT INTO "${this.constructor.tableName}"
      (${columns})
      VALUES (${placeholders})
      RETURNING *
    `, values);
    return result.rows[0];
  }

  async update(id, input) {
    const fieldPlaceholders = Object.keys(input).map((column, index) => `"${column}" = $${index + 1}`);
    const values = Object.values(input);
    /*
    fieldPlaceholders ==> ['"label" = $1', '"route" = $2']
    values ==> ['Angular','/angular']
    */
    const result = await this.client.query(`
      UPDATE ${this.constructor.tableName} SET
        ${fieldPlaceholders},
        updated_at = now()
      WHERE id = $${fieldPlaceholders.length + 1}
      RETURNING *
    `, [
      ...values,
      id,
    ]);
    /*
    On aurai pu faire la requête :
    values.id = id;
    */
    return result.rows[0];
  }

  async delete(id) {
    const result = await this.client.query(`DELETE FROM ${this.constructor.tableName} WHERE id = $1`, [id]);
    // On transforme 0 ou 1 en false ou true
    // Donc on s'assure que la méthode renvoi une valeur de type boolean
    return !!result.rowCount;
  }
}
