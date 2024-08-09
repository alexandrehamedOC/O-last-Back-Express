import CoreDatamapper from "./core.datamapper.js";
import bcrypt from "bcryptjs";
import ApiError from "../errors/api.errors.js";

export default class UserDatamapper extends CoreDatamapper {
  static tableName = "users";

  static async findUser(email, password) {

    const result = await this.client.query(
      `SELECT * FROM "users" WHERE "email" =$1`,
      [email],
    );
    const user = result.rows[0];

    if (!user) {
      throw new ApiError('Email not found', 404, 'USER_NOT_FOUND');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch === false) {
      throw new ApiError('Password not match', 401, 'PASSWORD_NOT_MATCH');
    }

    return user;
  }

  static async getUserByMail(email) {
    const result = await this.client.query(
      `SELECT * FROM "users" WHERE "email" =$1`,
      [email],
    );
    const user = result.rows[0];

    if (!user) {
      return null;
    }
    return user;
  }


  static async findByEmail(email) {
    const result = await this.client.query(
      `SELECT * FROM ${this.tableName} WHERE "email" =$1`,
      [email],
    );
    const user = result.rows[0];

    if(!user){
      return null;
    }
    return user;
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
      `INSERT INTO ${this.tableName} ("firstname", "lastname", "email", "password", "city", "birth_date", "discord_username") 
      VALUES ($1,$2,$3,$4,$5,$6,$7)  
      RETURNING *`,
      [
        firstname,
        lastname,
        email,
        hashedPassword,
        city,
        birth_date,
        discord_username,
      ],
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
      [id],
    );

    return rows;
  }
  static async updatePassword(newPassword, email) {
    const result = await this.client.query(
      `UPDATE users SET password = $1 WHERE email = $2`,
      [newPassword, email],
    );
    const { rows } = result;
    return rows;
  }
}
