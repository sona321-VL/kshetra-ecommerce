import express from "express";

import {
  createOrder,
  getMyOrders,
  getOrderById,
  getMyOrdersCount,
  getTotalSpent
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   CREATE ORDER
========================= */

router.post("/", protect, createOrder);


/* =========================
   GET MY ORDERS
========================= */

router.get("/my-orders", protect, getMyOrders);


/* =========================
   GET MY ORDERS COUNT
========================= */

router.get("/count", protect, getMyOrdersCount);


/* =========================
   GET TOTAL SPENT
========================= */

router.get("/total-spent", protect, getTotalSpent);


/* =========================
   GET ORDER BY ID
========================= */

router.get("/:id", protect, getOrderById);


export default router;