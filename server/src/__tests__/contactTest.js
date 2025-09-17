const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Contact = require("../models/contactModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: '../../.env' });
process.env.NODE_ENV = "test";

describe("Contacts API", () => {
  let token, userId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);

    // Créer un utilisateur pour les tests
    const user = new User({ email: "contactuser", password: "pass" });
    await user.save();
    userId = user._id;

    // Générer un token
    token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, { expiresIn: "1h" });
  });

  afterAll(async () => {
    await User.deleteMany();
    await Contact.deleteMany();
    await mongoose.connection.close();
  });

  it("should create a contact", async () => {
    const res = await request(app)
      .post("/contacts/create")
      .set("Authorization", `Bearer ${token}`)
      .send({ firstname: "John", lastname: "Doe", phone: "123456789" });

    expect(res.statusCode).toEqual(201);
    expect(res.body.contact.firstname).toBe("John");
  });

  it("should list user's contacts", async () => {
    const res = await request(app)
      .get("/contacts/list")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should update a contact", async () => {
    const contact = await Contact.create({ firstName: "Jane", lastName: "Doe", phone: "000", userId });
    
    const res = await request(app)
      .patch(`/contacts/update/${contact._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ firstName: "Janet" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.contact.firstName).toBe("Janet");
  });

  it("should delete a contact", async () => {
    const contact = await Contact.create({ firstName: "Mike", lastName: "Smith", phone: "999", userId });

    const res = await request(app)
      .delete(`/contacts/delete/${contact._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Contact supprimé");
  });
});
