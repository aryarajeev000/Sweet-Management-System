import app from "./app.js";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";

(async () => {
  await connectDB();
  app.listen(ENV.PORT, () =>
    console.log(`Server running on http://localhost:${ENV.PORT}`)
  );
})();
