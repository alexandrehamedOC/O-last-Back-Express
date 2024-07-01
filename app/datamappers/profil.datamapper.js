import CoreDatamapper from "./core.datamapper.js";

class ProfilDatamapper extends CoreDatamapper {
  static tableName = "profil";

  static async createProfil(profilData) {
    const query = `INSERT INTO ${this.tableName} 
        (name, description, rank, level, game_id, user_id) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [
      profilData.name,
      profilData.description,
      profilData.rank,
      profilData.level,
      profilData.game_id,
      profilData.user_id,
    ];
    const result = await this.query(query, values);
    return result.rows[0];
  }

  static async updateById(id, profilData) {
    const query = `UPDATE ${this.tableName} 
        SET name = $1, description = $2, rank = $3, level = $4, game_id = $5, user_id = $6
        WHERE id = $7 RETURNING *`;
    const values = [
      profilData.name,
      profilData.description,
      profilData.rank,
      profilData.level,
      profilData.game_id,
      profilData.user_id,
      id,
    ];
    const result = await this.query(query, values);
    return result.rows[0];
  }

  static async deleteById(id) {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *`;
    const values = [id];
    const result = await this.query(query, values);
    return result.rows[0];
  }
}

export default ProfilDatamapper;
