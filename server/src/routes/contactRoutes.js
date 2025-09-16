const express = require("express");
const router = express.Router();

const { 
    createContactController,
    updateContactController,
    deleteContactController,
    listContactsController
  } = require("../controllers/contactController");

const verifyToken = require("../middlewares/authMiddleware");

router.post('/create', verifyToken, createContactController);
router.patch('/update/:id', verifyToken, updateContactController);
router.delete('/delete/:id', verifyToken, deleteContactController);
router.get('/list', verifyToken, listContactsController);


module.exports = router;

//swagger

/**
 * @openapi
 * /contacts/create:
 *   post:
 *     summary: Crée un nouveau contact
 *     description: Accessible uniquement avec un token JWT valide. Permet de créer un contact.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - phone
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: "John"
 *               lastname:
 *                 type: string
 *                 example: "Doe"
 *               phone:
 *                 type: string
 *                 example: "+33 6 12 34 56 78"
 *     responses:
 *       201:
 *         description: Contact créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact créé"
 *                 contact:
 *                   type: object
 *                   example: { id: "64f3a...", firstname: "John", lastname: "Doe", phone: "+33 6 12 34 56 78" }
 *       401:
 *         description: Token manquant ou invalide
 *       500:
 *         description: Erreur serveur
 */



/**
 * @openapi
 * /contacts/update/{id}:
 *   patch:
 *     summary: Met à jour un contact existant
 *     description: Accessible uniquement avec un token JWT valide. Permet de modifier les informations d'un contact.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du contact à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               phone:
 *                 type: string
 *                 example: "+33 6 12 34 56 78"
 *     responses:
 *       200:
 *         description: Contact mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact mis à jour"
 *                 contact:
 *                   type: object
 *                   example: 
 *                     _id: "68c952fbb6f19f924eab1572"
 *                     firstName: "John"
 *                     lastName: "Doe"
 *                     phone: "+33 6 12 34 56 78"
 *       401:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Contact non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @openapi
 * /contacts/delete/{id}:
 *   delete:
 *     summary: Supprime un contact
 *     description: Accessible uniquement avec un token JWT valide. Permet de supprimer un contact existant.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du contact à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact supprimé"
 *                 contact:
 *                   type: object
 *                   example:
 *                     _id: "68c952fbb6f19f924eab1572"
 *                     firstName: "Alice"
 *                     lastName: "Doe"
 *                     phone: "+33 6 12 34 56 78"
 *       401:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Contact non trouvé
 *       500:
 *         description: Erreur serveur
 */


/**
 * @openapi
 * /contacts/list:
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

