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

let token = "";
let sweetId = "";

beforeEach(async () => {
  // Register
  await request(app).post("/api/auth/register").send({
    email: "user@test.com",
    password: "password123",
  });

  // Login
  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({
      email: "user@test.com",
      password: "password123",
    });

  token = loginRes.body.token;

  // Create sweet (IMPORTANT)
  const sweetRes = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Rasgulla",
      category: "Milk",
      price: 10,
      quantity: 5,
    });

  sweetId = sweetRes.body._id;
});

describe("Sweet Routes", () => {
  it("should block access without token", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.status).toBe(401);
  });

  it("should purchase a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 2 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(3);
  });

  it("should fail if stock is insufficient", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 100 });

    expect(res.status).toBe(500);
  });
});
