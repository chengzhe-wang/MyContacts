
const express = require("express");
const { 
  createUserController, 
  listDatabasesController 
} = require("../controllers/userController");


const router = express.Router();


/**
 * @openapi
 * /users/create:
 *   post:
 *     summary: Créer une nouveau user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User créé
 */
router.post("/users/create", createUserController);

/**
 * @openapi
 * /users/databases:
 *   get:
 *     summary: Liste les bases de données MongoDB
 *     responses:
 *       200:
 *         description: Retourne la liste des bases
 */
router.get("/users/databases", listDatabasesController);


module.exports = router;
