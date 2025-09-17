const userService = require("../services/userService");

async function registerController(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userService.registerUser(email, password);
        res.status(201).json({ message: "User créé", user: {id: user._id, email: user.email, createdAt : user.createdAt} });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function loginController(req, res) {
    try {
        const { email, password } = req.body;
        const result = await userService.loginUser(email, password);

        if (!result) {
            return res.status(401).json({ error: 'Echec d\'authentication' });
        }

        res.status(200).json({ token: result.token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur de connexion' });
    }
}

async function listUsersController(_req, res) {
    const users = await userService.getAllUsers();
    res.json(users);
}


module.exports = {
    registerController,
    loginController,
    listUsersController,
};