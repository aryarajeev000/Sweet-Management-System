import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI! as string,
  JWT_SECRET: process.env.JWT_SECRET! as string,
};

if (!ENV.MONGODB_URI) throw new Error("MONGODB_URI missing");
if (!ENV.JWT_SECRET) throw new Error("JWT_SECRET missing");
