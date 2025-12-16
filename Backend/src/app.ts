import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import sweetRoutes from "./modules/sweets/sweet.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log("[REQUEST]", {
    method: req.method,
    path: req.path,
    timestamp: new Date().toISOString(),
    body: req.method === "POST" || req.method === "PUT" ? {
      ...req.body,
      password: req.body?.password ? "***" : undefined,
    } : undefined,
  });
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

//check health
app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

// Error Middleware
app.use(errorMiddleware);

export default app;
