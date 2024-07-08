import express from "express";
import UserController from "../controllers/user.controller.js";
import { userSchema } from "../utils/validationSchemas.js";
import validationMiddleware from "../middleware/validation.middleware.js"; // Assurez-vous que le chemin est correct

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *         - birth_date
 *         - discord_username
 *         - city
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *           description: L'identifiant de l'utilisateur
 *         firstname:
 *           type: string
 *           description: Le prénom de l'utilisateur
 *         lastname:
 *           type: string
 *           description: Le nom de famille de l'utilisateur
 *         email:
 *           type: string
 *           description: L'adresse email de l'utilisateur
 *         password:
 *           type: string
 *           description: Le mot de passe de l'utilisateur (haché)
 *         birth_date:
 *           type: string
 *           format: date
 *           description: La date de naissance de l'utilisateur
 *         discord_username:
 *           type: string
 *           description: Le nom d'utilisateur Discord de l'utilisateur
 *         city:
 *           type: string
 *           description: La ville de l'utilisateur
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: La date de création de l'utilisateur
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: La date de la dernière mise à jour de l'utilisateur
 *       example:
 *         id: 1
 *         firstname: John
 *         lastname: Doe
 *         email: john.doe@example.com
 *         password: hashed_password1
 *         birth_date: "1990-05-15"
 *         discord_username: JohnDoe#1234
 *         city: New York
 *         created_at: "2024-07-05T08:11:37.829Z"
 *         updated_at: null
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API pour gérer les utilisateurs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retourne la liste de tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: La liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Erreur de validation
 */

router.route("/")
  .get(UserController.getAll.bind(UserController))
  .post(
    validationMiddleware(userSchema), // Utilisez la méthode statique directement
    UserController.createAccount.bind(UserController),
  );



/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retourne un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant de l'utilisateur
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Utilisateur non trouvé
 *   patch:
 *     summary: Met à jour un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Utilisateur non trouvé
 *   delete:
 *     summary: Supprime un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant de l'utilisateur
 *     responses:
 *       204:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 */

router.route("/:id")
  .get(UserController.getOne.bind(UserController))
  .delete(UserController.delete.bind(UserController))
  .patch(
    validationMiddleware(userSchema), // Utilisez la méthode statique directement
    UserController.update.bind(UserController),
  );

/**
 * @swagger
 * /users/{id}/details:
 *   get:
 *     summary: Retourne les détails d'un utilisateur par ID, y compris ses posts, profils et notes
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant de l'utilisateur
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user:
 *                     $ref: '#/components/schemas/User'
 *                   posts:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Post'
 *                   profiles:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Profil'
 *                   rates:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Rate'
 *       404:
 *         description: Utilisateur non trouvé
 */

router.route("/:id/details")
  .get(UserController.getUserDetails.bind(UserController));

export default router;
