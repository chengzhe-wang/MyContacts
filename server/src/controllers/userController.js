const userService = require("../services/userService");

async function createUserController(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userService.createUser(email, password);
      res.status(201).json({ message: "User créé", user: {id: user._id, email: user.email, createdAt : user.createdAt} });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async function listUsersController(_req, res) {
    const users = await userService.getAllUsers();
    res.json(users);
  }
  
  
  module.exports = {
    createUserController,
    listUsersController,
  };