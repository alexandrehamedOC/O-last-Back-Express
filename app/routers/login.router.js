import express from "express";
import UserController from "../controllers/user.controller.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *         - city
 *         - birth_date
 *         - discord_username
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
 *           format: email
 *           description: L'adresse e-mail de l'utilisateur
 *         password:
 *           type: string
 *           format: password
 *           description: Le mot de passe de l'utilisateur
 *         city:
 *           type: string
 *           description: La ville de l'utilisateur
 *         birth_date:
 *           type: string
 *           format: date
 *           description: La date de naissance de l'utilisateur
 *         discord_username:
 *           type: string
 *           description: Le nom d'utilisateur Discord de l'utilisateur
 *       example:
 *         id: 1
 *         firstname: "John"
 *         lastname: "Doe"
 *         email: "john.doe@example.com"
 *         password: "password123"
 *         city: "Paris"
 *         birth_date: "1990-01-01"
 *         discord_username: "johnDoe#1234"
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API pour gérer les utilisateurs
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connecte un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: L'adresse e-mail de l'utilisateur
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Le mot de passe de l'utilisateur
 *             example:
 *               email: "john.doe@example.com"
 *               password: "password123"
 *     responses:
 *       200:
 *         description: Utilisateur connecté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Jeton JWT de l'utilisateur
 *       400:
 *         description: Erreur de validation
 *       401:
 *         description: E-mail ou mot de passe incorrect
 */

router.route("/login").post(UserController.getLogUser.bind(UserController));



/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Envoie un e-mail de réinitialisation de mot de passe
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: L'adresse e-mail de l'utilisateur pour recevoir le lien de réinitialisation
 *             example:
 *               email: "john.doe@example.com"
 *     responses:
 *       200:
 *         description: E-mail de réinitialisation envoyé
 *       400:
 *         description: Adresse e-mail non trouvée
 *       500:
 *         description: Erreur serveur
 */

router
  .route("/forgot-password")
  .post(UserController.resetPassword.bind(UserController));


/**
 * @swagger
 * /forgot-password/{token}:
 *   post:
 *     summary: Réinitialise le mot de passe de l'utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Jeton JWT pour la réinitialisation du mot de passe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Le nouveau mot de passe de l'utilisateur
 *             example:
 *               password: "newpassword123"
 *     responses:
 *       200:
 *         description: Mot de passe réinitialisé avec succès
 *       400:
 *         description: Token invalide ou utilisateur inconnu
 *       500:
 *         description: Erreur serveur
 */

router
  .route("/forgot-password/:token")
  .post(UserController.submitNewPassword.bind(UserController));

export default router;
