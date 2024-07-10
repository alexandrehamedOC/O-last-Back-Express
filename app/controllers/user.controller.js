import { UserDatamapper } from "../datamappers/index.datamapper.js";
import { userSchema } from "../utils/validationSchemas.js";
import CoreController from "./core.controller.js";
import ApiError from "../errors/api.errors.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export default class UserController extends CoreController {
  static entityName = "Users";
  static mainDatamapper = UserDatamapper;
  static validateSchema = userSchema;

  static async getLogUser(req, res, next) {
    const { email, password } = req.body;
    try {
      const result = await UserDatamapper.findUser(email, password);
      if (!result) {
        return next(new ApiError(`${this.entityName} not found`, 404, 'NOT_FOUND'));
      }
      const userId = result.id;
      const token = jwt.sign({ email: email, userId: userId }, process.env.TOKEN_SECRET, { expiresIn: '2h' });
      res.cookie('token', token, { httpOnly: true});
      res.json(userId);
    } catch (error) {
      console.error(error);
      return next(new ApiError());
    }
  }

  static async getUserDetails(req, res, next){
    const {id} = req.params;
    try {
      const details = await UserDatamapper.userDetails(id);
      if(!details){
        return next(new ApiError(`${this.entityName} not found`, 404, 'NOT_FOUND'));
      };

      return res.json(details);
    } catch (error) {
      console.error(error);
      return next(new ApiError());
    }
  }

  static async createAccount(req, res, next){
    try {
      const input = req.body;

      // Validation simple des entrées
      if (!input.firstname || !input.lastname || !input.email || !input.password || !input.city || !input.birth_date) {
        return next(new ApiError('All fields required', 400, 'BAD_REQUEST'));
      }

      const emailExist = await UserDatamapper.findByEmail(input.email);

      if(emailExist){
        return next(new ApiError('Email already exist', 400, 'BAD_REQUEST'));
      }

      const user = await UserDatamapper.createUser(input);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json(error, { error: "Unable to create account" });
    }
  }

  static async resetPassword(req, res) {
    const { email } = req.body;
    try {
      const user = await UserDatamapper.getUserByMail(email);
      if (!user) {
        return res.status(400).send("Cet adresse email n'exite pas");
      }

      const tokenPassword = jwt.sign(
        { email: user.email },
        process.env.TOKEN_SECRET,
        { expiresIn: "2h" },
      );

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "alexandrehamedoclock@gmail.com",
          pass: "gjma ppra nrcz qjbc",
        },
      });

      const mailOptions = {
        to: user.email,
        from: "alexandrehamedoclock@gmail.com",
        subject: "Password Reset OLAST",
        text: `HELLO mon coco voici ton url pour reset ton password. Attention tu n'as que 2h pour le faire (avec ta tete la)\n\n http://localhost:3000/reset-password/${tokenPassword} \n\n`,
      };

      const testMail = await transporter.sendMail(mailOptions);
      if (!testMail) {
        return res.status(400).send("Erreur lors de l'envoi du mail");
      }
      res.status(200).send("Un email a été envoyé");
    } catch (err) {
      res.status(500).send("Error on the server :", err.message);
    }
  }
  static async submitNewPassword(req, res) {
    const { token } = req.params;
    const { password } = req.body;
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const email = decoded.email;

      const user = await UserDatamapper.getUserByMail(email);
      if (!user) {
        return res.status(400).send("Token invalid ou utilisateur inconnu");
      }
      const saltRound = 10;


      const newHashedPassword = await bcrypt.hash(password, saltRound);

      const result = await UserDatamapper.updatePassword(
        newHashedPassword,
        email,
      );
      if (!result) {
        return res.status(400).send("Erreur lors de la mise à jour du mot de passe");
      }
      res.status(200).send("mot de passe modifié avec succès");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error on the server.");
    }
  }
}
