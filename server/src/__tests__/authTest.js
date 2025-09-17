require('dotenv').config({ path: '../../.env' });
const request = require("supertest");
const app = require("../app"); // ton Express app
const mongoose = require("mongoose");
const User = require("../models/userModel");
process.env.NODE_ENV = "test";

describe("Auth API", () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  afterAll(async () => {
    await User.deleteMany(); // clean test DB
    await mongoose.connection.close();
  });

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email: "testuser", password: "testpass" });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe("User créé");
    expect(res.body.userId).toBeDefined();
  });

  it("should login an existing user", async () => {
    await request(app)
      .post("/auth/register")
      .send({ email: "loginuser", password: "loginpass" });

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "loginuser", password: "loginpass" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });
});
