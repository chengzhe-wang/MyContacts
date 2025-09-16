
const express = require("express");
const { 
  registerController,
  loginController,
  listUsersController 
} = require("../controllers/userController");


const router = express.Router();


/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Créer un nouveau user
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
 *                 example : "test@email.com"
 *               password:
 *                 type: string
 *                 example : "password123"
 *     responses:
 *       201:
 *         description: User créé
 *       500:
 *        description: Erreur serveur
 */
router.post("/register", registerController);


/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Authentification d'un utilisateur
 *     description: Vérifie le mot de passe et renvoie un token JWT si la connexion est réussie.
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
 *                 example: "test@email.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Connexion réussie, renvoie un token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Échec de l'authentification
 *       500:
 *         description: Erreur serveur
 */
router.post("/login", loginController);

/**
 * @openapi
 * /auth/get:
 *   get:
 *     summary: Liste des users
 *     responses:
 *       200:
 *         description: Retourne la liste des users
 */
router.get("/get", listUsersController);



module.exports = router;
