import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("[ERROR MIDDLEWARE] Unhandled error:", {
    message: err?.message,
    stack: err?.stack,
    name: err?.name,
    code: err?.code,
    path: req.path,
    method: req.method,
    body: req.body,
    timestamp: new Date().toISOString(),
  });

  // Handle specific error types
  if (err?.name === "ValidationError") {
    return res.status(400).json({
      message: err.message || "Validation error",
    });
  }

  if (err?.code === 11000) {
    // Duplicate key error (MongoDB)
    return res.status(409).json({
      message: "User already exists",
    });
  }

  if (err?.name === "CastError") {
    return res.status(400).json({
      message: "Invalid data format",
    });
  }

  // Default error response
  const statusCode = err?.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Server error",
  });
};
