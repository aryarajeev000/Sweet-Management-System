import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import { ENV } from "../config/env.js";

beforeAll(async () => {
  await mongoose.connect(ENV.MONGODB_URI);
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth Routes", () => {
  const user = {
    email: "test@example.com",
    password: "password123",
  };

  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(user);

    expect(res.status).toBe(201);
    expect(res.body.email).toBe(user.email);
    expect(res.body.password).toBeUndefined();
  });

  it("should login a user and return JWT", async () => {
    await request(app).post("/api/auth/register").send(user);

    const res = await request(app)
      .post("/api/auth/login")
      .send(user);

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("should fail login with wrong password", async () => {
    await request(app).post("/api/auth/register").send(user);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: user.email, password: "wrong" });

    expect(res.status).toBe(500);
  });

  it("should not allow duplicate registration", async () => {
    await request(app).post("/api/auth/register").send(user);

    const res = await request(app)
      .post("/api/auth/register")
      .send(user);

    expect(res.status).toBe(500);
  });
});
