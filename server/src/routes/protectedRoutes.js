const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");


/**
 * @openapi
 * /protected:
 *   get:
 *     summary: Route protégée
 *     description: Accessible uniquement avec un token JWT valide.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Accès autorisé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Protected route accessed"
 *                 user:
 *                   type: object
 *                   example: { userId: "64f3a..." }
 *       401:
 *         description: Token manquant ou invalide
 */


/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.get('/', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed' });
    });


module.exports = router;