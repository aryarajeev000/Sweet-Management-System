import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./user.model.js";
import { ENV } from "../../config/env.js";

export class AuthService {
  static async register(email: string, password: string) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    return {
      id: user._id,
      email: user.email,
      role: user.role,
    };
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      ENV.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
