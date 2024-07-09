import express from 'express';
import PostController from '../controllers/post.controller.js';
import { postSchema } from '../utils/validationSchemas.js';
import validationMiddleware from '../middleware/validation.middleware.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - platform
 *         - description
 *         - schedule_start
 *         - schedule_end
 *         - status
 *         - user_id
 *         - game_id
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *           description: L'identifiant du post
 *         title:
 *           type: string
 *           description: Le titre du post
 *         platform:
 *           type: string
 *           description: La plateforme pour laquelle le post est fait
 *         description:
 *           type: string
 *           description: La description du post
 *         schedule_start:
 *           type: string
 *           format: date-time
 *           description: La date et l'heure de début de l'événement
 *         schedule_end:
 *           type: string
 *           format: date-time
 *           description: La date et l'heure de fin de l'événement
 *         status:
 *           type: boolean
 *           description: Le statut du post (actif ou inactif)
 *         user_id:
 *           type: integer
 *           description: L'identifiant de l'utilisateur ayant créé le post
 *         game_id:
 *           type: integer
 *           description: L'identifiant du jeu lié au post
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: La date de création du post
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: La date de la dernière mise à jour du post
 *       example:
 *         id: 1
 *         title: "Looking for duo"
 *         platform: "PC"
 *         description: "Looking for a duo partner in League of Legends"
 *         schedule_start: "2024-07-01T18:00:00.000Z"
 *         schedule_end: "2024-07-01T20:00:00.000Z"
 *         status: true
 *         user_id: 1
 *         game_id: 1
 *         created_at: "2024-07-05T08:11:37.829Z"
 *         updated_at: null
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API pour gérer les posts
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retourne la liste de tous les posts
 *     tags: [Posts]
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
 *         description: La liste des posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *   post:
 *     summary: Crée un nouveau post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Post créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Erreur de validation
 */

router.route('/posts')
  .get(PostController.getAll.bind(PostController))
  .post(
    authMiddleware.verifyToken, validationMiddleware(postSchema), PostController.createpost.bind(PostController));

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Retourne un post par ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant du post
 *     responses:
 *       200:
 *         description: Détails du post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post non trouvé
 *   patch:
 *     summary: Met à jour un post par ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant du post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Post non trouvé
 *   delete:
 *     summary: Supprime un post par ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant du post
 *     responses:
 *       204:
 *         description: Post supprimé avec succès
 *       404:
 *         description: Post non trouvé
 */
router.route('/posts/:id')
  .get(PostController.getOne.bind(PostController))
  .patch(
    authMiddleware.verifyToken, validationMiddleware(postSchema), PostController.update.bind(PostController))
  .delete(
    authMiddleware.verifyToken, PostController.delete.bind(PostController));

/**
 * @swagger
 * /posts/user/{userId}:
 *   get:
 *     summary: Retourne les posts d'un utilisateur par ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant de l'utilisateur
 *     responses:
 *       200:
 *         description: La liste des posts de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       404:
 *         description: Utilisateur non trouvé
 */
router.route('/posts/user/:userId')
  .get(PostController.findByUserId.bind(PostController));

export default router;
