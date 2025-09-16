const connectDB = require('../../mongo');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');


async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  return user.save();
}

async function getAllUsers() {
  return User.find();
}

  
  async function listDatabases() {
    const db = await connectDB();
    const databasesList = await db.admin().listDatabases();
    return databasesList.databases;
  }
  
  module.exports = {
    createUser,
    listDatabases,
    getAllUsers,
  };