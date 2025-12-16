import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./user.model.js";
import { ENV } from "../../config/env.js";

export class AuthService {
  static async register(email: string, password: string) {
    console.log("[AUTH SERVICE] Register - Starting registration for:", email);
    
    try {
      console.log("[AUTH SERVICE] Register - Checking for existing user...");
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.error("[AUTH SERVICE] Register - User already exists:", email);
        throw new Error("User already exists");
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
     
      const user = await User.create({
        email,
        password: hashedPassword,
      });
      console.log("[AUTH SERVICE] Register - User created successfully with ID:", user._id);

      return {
        id: user._id,
        email: user.email,
        role: user.role,
      };
    } catch (error: any) {
      console.error("[AUTH SERVICE] Register - Database error:", {
        message: error?.message,
        code: error?.code,
        name: error?.name,
      });
      throw error;
    }
  }

  static async login(email: string, password: string) {
    console.log("[AUTH SERVICE] Login - Starting login for:", email);
    
    try {
      console.log("[AUTH SERVICE] Login - Finding user in database...");
      const user = await User.findOne({ email });
      if (!user) {
        console.error("[AUTH SERVICE] Login - User not found:", email);
        throw new Error("Invalid credentials");
      }
      console.log("[AUTH SERVICE] Login - User found with ID:", user._id);

      console.log("[AUTH SERVICE] Login - Comparing passwords...");
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.error("[AUTH SERVICE] Login - Password mismatch for:", email);
        throw new Error("Invalid credentials");
      }

      if (!ENV.JWT_SECRET) {
        console.error("[AUTH SERVICE] Login - JWT_SECRET is not defined!");
        throw new Error("JWT_SECRET is not configured");
      }
      
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        ENV.JWT_SECRET,
        { expiresIn: "1d" }
      );
      console.log("[AUTH SERVICE] Login - Token generated successfully");

      return {
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error: any) {
      console.error("[AUTH SERVICE] Login - Error:", {
        message: error?.message,
        code: error?.code,
        name: error?.name,
      });
      throw error;
    }
  }
}
