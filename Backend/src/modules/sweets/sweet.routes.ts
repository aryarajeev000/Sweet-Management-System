import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import * as controller from "./sweet.controller.js";

const router = Router();

// Protected routes
router.use(authMiddleware);

// CRUD
router.post("/", controller.createSweet);
router.get("/", controller.getAllSweets);
router.get("/search", controller.searchSweets);
router.put("/:id", controller.updateSweet);
router.delete("/:id", controller.deleteSweet);

// Inventory
router.post("/:id/purchase", controller.purchaseSweet);
router.post("/:id/restock", controller.restockSweet);

export default router;
