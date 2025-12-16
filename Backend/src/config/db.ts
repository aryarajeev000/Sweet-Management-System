import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    console.log("[DATABASE] Attempting to connect to MongoDB...");
    console.log("[DATABASE] Connection string:", ENV.MONGODB_URI ? "Provided" : "Missing");
    
    if (!ENV.MONGODB_URI) {
      console.error("[DATABASE] MongoDB URI is not defined in environment variables!");
      throw new Error("MONGODB_URI is not configured");
    }

    await mongoose.connect(ENV.MONGODB_URI);
    console.log("[DATABASE] MongoDB connected successfully");
    console.log("[DATABASE] Connection state:", mongoose.connection.readyState);
  } catch (err: any) {
    console.error("[DATABASE] MongoDB connection failed:", {
      message: err?.message,
      code: err?.code,
      name: err?.name,
      stack: err?.stack,
    });
    process.exit(1);
  }
};
