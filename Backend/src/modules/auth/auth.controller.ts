import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service.js";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("[REGISTER] Request received:", {
      email: req.body?.email,
      hasPassword: !!req.body?.password,
      timestamp: new Date().toISOString(),
    });

    // Validate input
    if (!req.body.email || !req.body.password) {
      console.error("[REGISTER] Validation failed: Missing email or password");
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    if (req.body.password.length < 6) {
      console.error("[REGISTER] Validation failed: Password too short");
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const user = await AuthService.register(req.body.email, req.body.password);
    console.log("[REGISTER] Success: User created with ID:", user.id);
    res.status(201).json(user);
  } catch (err: any) {
    console.error("[REGISTER] Error:", {
      message: err?.message,
      stack: err?.stack,
      timestamp: new Date().toISOString(),
    });
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("[LOGIN] Request received:", {
      email: req.body?.email,
      hasPassword: !!req.body?.password,
      timestamp: new Date().toISOString(),
    });

    // Validate input
    if (!req.body.email || !req.body.password) {
      console.error("[LOGIN] Validation failed: Missing email or password");
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const result = await AuthService.login(req.body.email, req.body.password);
    console.log("[LOGIN] Success: User logged in with email:", req.body.email);
    res.json(result);
  } catch (err: any) {
    console.error("[LOGIN] Error:", {
      message: err?.message,
      stack: err?.stack,
      timestamp: new Date().toISOString(),
    });
    next(err);
  }
};
