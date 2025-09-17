const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    return user;
}

async function loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) return null;

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return null;

    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
        expiresIn: '1h',
    });

    return { user, token };
}

async function getAllUsers() {
    return User.find();
}

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};