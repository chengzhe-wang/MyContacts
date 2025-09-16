
const express = require("express");
const { 
  registerController,
  loginController,
  listUsersController 
} = require("../controllers/userController");


const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/get", listUsersController);

module.exports = router;
