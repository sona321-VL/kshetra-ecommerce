import express from "express";
import {
  getDashboardAnalytics,
  getRevenueByMonth,
  getOrderStatusAnalytics,
  getTopSellingProducts,
} from "../controllers/adminAnalyticsController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, admin, getDashboardAnalytics);
router.get("/revenue-monthly", protect, admin, getRevenueByMonth);
router.get("/order-status", protect, admin, getOrderStatusAnalytics);
router.get("/top-products", protect, admin, getTopSellingProducts);

export default router;
