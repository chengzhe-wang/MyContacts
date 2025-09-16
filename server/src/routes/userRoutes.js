
const express = require("express");
const { 
  createUserController, 
  listUsersController 
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
 * /users/get:
 *   get:
 *     summary: Liste les Users
 *     responses:
 *       200:
 *         description: Retourne la liste des users
 */
router.get("/users/get", listUsersController);


module.exports = router;
