import app from "./app.js";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";

(async () => {
  try {
    console.log("[SERVER] Starting server initialization...");
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`[SERVER] Server running on http://localhost:${ENV.PORT}`);
      console.log(`[SERVER] Health check: http://localhost:${ENV.PORT}/health`);
      console.log(`[SERVER] Auth routes: http://localhost:${ENV.PORT}/api/auth`);
    });
  } catch (error: any) {
    console.error("[SERVER] Failed to start server:", {
      message: error?.message,
      stack: error?.stack,
    });
    process.exit(1);
  }
})();
