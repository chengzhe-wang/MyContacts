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


