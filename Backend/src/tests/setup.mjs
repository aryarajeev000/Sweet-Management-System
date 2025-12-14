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
