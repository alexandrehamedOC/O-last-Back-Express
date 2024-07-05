import express from "express";
import ProfilController from "../controllers/profil.controller.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Profil:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *         - rank
 *         - level
 *         - game_id
 *         - user_id
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *           description: L'identifiant du profil
 *         name:
 *           type: string
 *           description: Le nom du profil
 *         description:
 *           type: string
 *           description: La description du profil
 *         rank:
 *           type: string
 *           description: Le rang du profil dans le jeu
 *         level:
 *           type: integer
 *           description: Le niveau du profil dans le jeu
 *         game_id:
 *           type: integer
 *           description: L'identifiant du jeu lié au profil
 *         user_id:
 *           type: integer
 *           description: L'identifiant de l'utilisateur auquel le profil appartient
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: La date de création du profil
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: La date de la dernière mise à jour du profil
 *       example:
 *         id: 1
 *         name: "Pro Gamer"
 *         description: "Experienced player in League of Legends"
 *         rank: "Diamond"
 *         level: 50
 *         game_id: 1
 *         user_id: 1
 *         created_at: "2024-07-05T08:11:37.829Z"
 *         updated_at: null
 */

/**
 * @swagger
 * tags:
 *   name: Profils
 *   description: API pour gérer les profils des joueurs
 */

/**
 * @swagger
 * /profil:
 *   get:
 *     summary: Retourne la liste de tous les profils
 *     tags: [Profils]
 *     responses:
 *       200:
 *         description: La liste des profils
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profil'
 *   post:
 *     summary: Crée un nouveau profil
 *     tags: [Profils]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profil'
 *     responses:
 *       201:
 *         description: Profil créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profil'
 *       400:
 *         description: Erreur de validation
 */
router.route("/profil")
  .get(ProfilController.getAll.bind(ProfilController))
  .post(ProfilController.create.bind(ProfilController));

/**
 * @swagger
 * /profil/{id}:
 *   get:
 *     summary: Retourne un profil par ID
 *     tags: [Profils]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant du profil
 *     responses:
 *       200:
 *         description: Détails du profil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profil'
 *       404:
 *         description: Profil non trouvé
 *   put:
 *     summary: Met à jour un profil par ID
 *     tags: [Profils]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant du profil
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profil'
 *     responses:
 *       200:
 *         description: Profil mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profil'
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Profil non trouvé
 *   delete:
 *     summary: Supprime un profil par ID
 *     tags: [Profils]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant du profil
 *     responses:
 *       204:
 *         description: Profil supprimé avec succès
 *       404:
 *         description: Profil non trouvé
 */
router.route("/profil/:id")
  .get(ProfilController.getOne.bind(ProfilController))
  .put(ProfilController.update.bind(ProfilController))
  .delete(ProfilController.delete.bind(ProfilController));

export default router;
