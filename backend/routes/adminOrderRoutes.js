import express from "express";
import {
  getAllOrdersAdmin,
  updateOrderAdmin,
  deleteOrderAdmin,
} from "../controllers/adminController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================
   ADMIN ORDER ROUTES
========================================= */

// GET all orders
router.get("/", protect, admin, getAllOrdersAdmin);

// UPDATE order (isPaid / isDelivered)
router.put("/:id", protect, admin, updateOrderAdmin);

// DELETE order
router.delete("/:id", protect, admin, deleteOrderAdmin);

export default router;
