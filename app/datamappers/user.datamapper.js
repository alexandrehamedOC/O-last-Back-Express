import CoreDatamapper from "./core.datamapper.js";
import bcrypt from "bcryptjs";

export default class UserDatamapper extends CoreDatamapper {
  static tableName = "users";

  static async findUser(email, password) {
    const result = await this.client.query(
      `SELECT * FROM "users" WHERE "email" =$1 AND password =$2`,
      [email, password]
    );
    const { rows } = result;
    return rows[0];
  }
  static async createUser({
    firstname,
    lastname,
    email,
    password,
    city,
    birth_date,
    discord_username,
  }) {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const result = await this.client.query(
      `INSERT INTO users (firstname,lastname,email, password,city,birth_date,discord_username) VALUES ($1,$2,$3,$4,$5,$6,$7)  RETURNING *`,
      [
        firstname,
        lastname,
        email,
        hashedPassword,
        city,
        birth_date,
        discord_username,
      ]
    );
    const { rows } = result;
    return rows[0];
  }
}
