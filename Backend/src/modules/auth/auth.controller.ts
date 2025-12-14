import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service.js";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await AuthService.register(req.body.email, req.body.password);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AuthService.login(req.body.email, req.body.password);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
