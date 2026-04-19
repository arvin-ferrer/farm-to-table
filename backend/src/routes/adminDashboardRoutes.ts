import express from "express";
import { users, orders, confirm, sales } from "../controllers/adminDashboardController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

// GET /api/admin/users
router.get("/users", protect, adminOnly, users);

// GET /api/admin/orders
router.get("/orders", protect, adminOnly, orders);

// PUT /api/orders/:id/confirm
router.put("/orders/:id/confirm", protect, adminOnly, confirm);

// GET /api/admin/sales
router.get("/sales", protect, adminOnly, sales);

export default router;
