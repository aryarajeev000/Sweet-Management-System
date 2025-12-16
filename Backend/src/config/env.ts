import dotenv from "dotenv";

console.log("[ENV] Loading environment variables...");
const result = dotenv.config();

if (result.error) {
  console.error("[ENV] Error loading .env file:", result.error);
} else {
  console.log("[ENV] Environment variables loaded successfully");
}

export const ENV = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI! as string,
  JWT_SECRET: process.env.JWT_SECRET! as string,
};

console.log("[ENV] Environment configuration:", {
  PORT: ENV.PORT,
  MONGODB_URI: ENV.MONGODB_URI ? "Set" : "Missing",
  JWT_SECRET: ENV.JWT_SECRET ? "Set" : "Missing",
});

if (!ENV.MONGODB_URI) {
  console.error("[ENV] CRITICAL: MONGODB_URI is missing!");
  throw new Error("MONGODB_URI missing");
}
if (!ENV.JWT_SECRET) {
  console.error("[ENV] CRITICAL: JWT_SECRET is missing!");
  throw new Error("JWT_SECRET missing");
}
