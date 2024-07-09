import express from "express";
import RateController from "../controllers/rate.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import validationMiddleware from "../middleware/validation.middleware.js";
import { rateSchema } from "../utils/validationSchemas.js";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Rate:
 *       type: object
 *       required:
 *         - id
 *         - note
 *         - description
 *         - sender_user_id
 *         - receiver_profil_id
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *           description: L'identifiant de la note
 *         note:
 *           type: integer
 *           description: La note donnée, entre 1 et 5
 *         description:
 *           type: string
 *           description: La description de la note
 *         sender_user_id:
 *           type: integer
 *           description: L'identifiant de l'utilisateur qui a donné la note
 *         receiver_profil_id:
 *           type: integer
 *           description: L'identifiant du profil qui a reçu la note
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: La date de création de la note
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: La date de la dernière mise à jour de la note
 *       example:
 *         id: 1
 *         note: 5
 *         description: "Great teammate, very cooperative!"
 *         sender_user_id: 2
 *         receiver_profil_id: 1
 *         created_at: "2024-07-05T08:11:37.829Z"
 *         updated_at: null
 */

/**
 * @swagger
 * tags:
 *   name: Rates
 *   description: API pour gérer les notes des utilisateurs
 */

/**
 * @swagger
 * /rates:
 *   get:
 *     summary: Retourne la liste de toutes les notes
 *     tags: [Rates]
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
 *         description: La liste des notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rate'
 *   post:
 *     summary: Crée une nouvelle note
 *     tags: [Rates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rate'
 *     responses:
 *       201:
 *         description: Note créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rate'
 *       400:
 *         description: Erreur de validation
 */

router
  .route("/rates")
  .get(RateController.getAll.bind(RateController))
  .post(
    authMiddleware.verifyToken,
    validationMiddleware(rateSchema),
    RateController.createRate.bind(RateController)
  );

/**
 * @swagger
 * /rates/{id}:
 *   get:
 *     summary: Retourne une note par ID
 *     tags: [Rates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant de la note
 *     responses:
 *       200:
 *         description: Détails de la note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rate'
 *       404:
 *         description: Note non trouvée
 *   patch:
 *     summary: Met à jour une note par ID
 *     tags: [Rates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant de la note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rate'
 *     responses:
 *       200:
 *         description: Note mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rate'
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Note non trouvée
 *   delete:
 *     summary: Supprime une note par ID
 *     tags: [Rates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant de la note
 *     responses:
 *       204:
 *         description: Note supprimée avec succès
 *       404:
 *         description: Note non trouvée
 */

router
  .route("/rates/:id")
  .get(RateController.getOne.bind(RateController))
  .patch(
    authMiddleware.verifyToken,
    validationMiddleware(rateSchema),
    RateController.update.bind(RateController)
  )
  .delete(
    authMiddleware.verifyToken,
    RateController.delete.bind(RateController)
  );

/**
 * @swagger
 * /rates/user/{userId}:
 *   get:
 *     summary: Retourne les notes d'un utilisateur par ID
 *     tags: [Rates]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant de l'utilisateur dont les notes sont récupérées
 *       - in: query
 *         name: itemsByPage
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Nombre de notes par page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Numéro de la page des résultats
 *     responses:
 *       200:
 *         description: Liste des notes pour l'utilisateur spécifié
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rate'
 *       404:
 *         description: Aucun profil trouvé pour cet utilisateur
 */

router
  .route("/rates/user/:userId")
  .get(RateController.getRatesByUser.bind(RateController));

export default router;
