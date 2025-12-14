import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import sweetRoutes from "./modules/sweets/sweet.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

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
