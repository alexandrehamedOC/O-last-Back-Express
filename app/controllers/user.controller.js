import { UserDatamapper } from "../datamappers/index.datamapper.js";
import CoreController from "./core.controller.js";
import ApiError from "../errors/api.errors.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export default class UserController extends CoreController {
  static entityName = "Users";
  static mainDatamapper = UserDatamapper;

  static async getLogUser(req, res, next) {
    const { email, password } = req.body;
    const result = await UserDatamapper.findUser(email, password);
    if (!result) {
      return next(
        new ApiError(`${this.entityName} not found`, { status: 404 })
      );
    }

    const token = jwt.sign({ email }, process.env.TOKEN_SECRET, {
      expiresIn: "2h",
    });
    res.send({ token });
  }

  static async getUserDetails(req, res, next) {
    const { id } = req.params;
    try {
      const details = await UserDatamapper.userDetails(id);
      // if(!user){
      //   return next(new ApiError(`${this.entityName} not found`, {status: 404}));
      // }

      return res.json({ data: details });
    } catch (error) {
      console.error(error);
      return next(new ApiError("Internal server error", { status: 500 }));
    }
  }

  // static async getUserProfiles(req, res, next){
  //   const {id} = req.params;
  //   try {
  //     const profiles = await ProfilDatamapper.findByUserId(id);
  //     if(!profiles){
  //       return next(new ApiError(`${this.entityName} npm`, {status: 404}));
  //     }
  //     return res.json({data: profiles});
  //   } catch (error) {
  //     console.error(error);
  //     return next(new ApiError('Internal server error', {status: 500}));
  //   }
  // }
  static async createAccount(req, res) {
    try {
      const input = req.body;

      // Validation simple des entrées
      if (
        !input.firstname ||
        !input.lastname ||
        !input.email ||
        !input.password ||
        !input.city ||
        !input.birth_date
      ) {
        return res.status(400).json({ error: "All fields are required" });
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
        { expiresIn: "2h" }
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
      res.status(200).send("Un email a été envoyé");
    } catch (err) {
      res.status(500).send("Error on the server.");
    }
  }
  static async submitNewPassword(req, res) {
    const { token } = req.params;
    console.log(req.body);
    const { password } = req.body;
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const email = decoded.email;

      const user = await UserDatamapper.getUserByMail(email);
      if (!user) {
        return res.status(400).send("Token invalid ou utilisateur inconnu");
      }
      const saltRound = 10;
      console.log(password)


      const newHashedPassword = await bcrypt.hash(password, saltRound);

      const result = await UserDatamapper.updatePassword(
        newHashedPassword,
        email
      );
      res.status(200).send("mot de passe modifié avec succès");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error on the server.");
    }
  }
}
