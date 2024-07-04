import CoreDatamapper from "./core.datamapper.js";
import bcrypt from "bcryptjs";

export default class UserDatamapper extends CoreDatamapper {
  static tableName = "users";

  static async findUser(email, password) {
    try {
      const result = await this.client.query(
        `SELECT * FROM "users" WHERE "email" =$1`,
        [email]
      );
      const user = result.rows[0];
      
      if(!user){
        return null;
      }
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (isMatch){
        return user;
      }
      else{
        return null
      }

    } catch (error) {
        throw error;
    }
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

  static async userDetails(id) {
    const { rows } = await this.client.query(
      `
      SELECT * FROM ${this.tableName}
      JOIN "post" ON "post"."user_id" = "users"."id"
      JOIN "game" ON "game"."id" = "post"."game_id"
      JOIN "profil" ON "users"."id" = "profil"."user_id"
      JOIN "rate" ON "rate"."receiver_profil_id" = "profil"."id"
      WHERE "users"."id" = $1
      `,
      [id]
    );

    return rows;
  }
}
