import CoreDatamapper from "./core.datamapper.js";

// app/datamappers/profil.datamapper.js


export default class ProfilDatamapper extends CoreDatamapper {
  static tableName = 'profil';
  static async findByUserId(userId) {
    const result = await this.client.query(
      `SELECT * FROM "${this.tableName}" WHERE "user_id" = $1`,
      [userId],
    );
    return result.rows;
  }
}


