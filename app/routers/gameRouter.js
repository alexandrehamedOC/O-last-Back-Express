import express from "express";
import GameController from "../controllers/game.controller.js";
const router = express.Router();




/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - pegi
 *         - category
 *         - description
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *           description: L'identifiant du jeu
 *         name:
 *           type: string
 *           description: Le nom du jeu
 *         pegi:
 *           type: integer
 *           description: L'âge minimum recommandé pour jouer au jeu
 *         category:
 *           type: integer
 *           description: La catégorie du jeu
 *         description:
 *           type: string
 *           description: La description du jeu
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: La date de création de l'enregistrement
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: La date de la dernière mise à jour de l'enregistrement
 *       example:
 *         id: 1
 *         name: "League of Legends"
 *         pegi: 12
 *         category: 1
 *         description: "MOBA game"
 *         created_at: "2024-07-05T08:11:37.829Z"
 *         updated_at: null
 */

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: API pour gérer les jeux
 */

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Retourne la liste de tous les jeux
 *     tags: [Games]
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
 *         description: La liste des jeux
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 */



router.route("/games").get(GameController.getAll.bind(GameController));


/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Retourne un jeu par ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant du jeu
 *     responses:
 *       200:
 *         description: Détails du jeu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: Jeu non trouvé
 */
router.route("/games/:id").get(GameController.getOne.bind(GameController));

export default router;
