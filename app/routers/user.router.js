import express from "express";
import UserController from "../controllers/user.controller.js";
import { userSchema } from "../utils/validationSchemas.js";
import authMiddleware from "../middleware/auth.middleware.js";
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
 *     summary: Retourne une liste d'utilisateurs avec pagination
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: itemsByPage
 *         schema:
 *           type: integer
 *           default: 20
 *         required: false
 *         description: Nombre d'éléments par page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 0
 *         required: false
 *         description: Numéro de la page
 *     responses:
 *       200:
 *         description: La liste des utilisateurs avec pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                   description: La page actuelle
 *                 totalPages:
 *                   type: integer
 *                   description: Le nombre total de pages
 *                 itemsByPage:
 *                   type: integer
 *                   description: Nombre d'éléments par page
 *                 totalItems:
 *                   type: integer
 *                   description: Nombre total d'éléments
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *               example:
 *                 currentPage: 0
 *                 totalPages: 3
 *                 itemsByPage: 20
 *                 totalItems: 50
 *                 data:
 *                   - id: 1
 *                     firstname: "John"
 *                     lastname: "Doe"
 *                     email: "john.doe@example.com"
 *                     password: "hashed_password1"
 *                     birth_date: "1990-05-15"
 *                     discord_username: "JohnDoe#1234"
 *                     city: "New York"
 *                     created_at: "2024-07-05T08:11:37.829Z"
 *                     updated_at: null
 *                   - id: 2
 *                     firstname: "Jane"
 *                     lastname: "Smith"
 *                     email: "jane.smith@example.com"
 *                     password: "hashed_password2"
 *                     birth_date: "1992-07-22"
 *                     discord_username: "JaneSmith#5678"
 *                     city: "Los Angeles"
 *                     created_at: "2024-07-05T08:11:37.829Z"
 *                     updated_at: null
 *       400:
 *         description: Erreur de validation des paramètres de requête
 *       500:
 *         description: Erreur interne du serveur
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
 *         description: Erreur de validation des données d'entrée
 *       500:
 *         description: Erreur interne du serveur
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
  .delete(authMiddleware.verifyToken, UserController.delete.bind(UserController))
  .patch(
    authMiddleware.verifyToken, validationMiddleware(userSchema), // Utilisez la méthode statique directement
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
