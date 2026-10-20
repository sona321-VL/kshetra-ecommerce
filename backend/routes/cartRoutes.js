import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  applyCoupon,
  removeCoupon,
} from "../controllers/cartController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);

// ✅ keep same as your frontend calls
router.put("/update", protect, updateCartItem);
router.delete("/remove", protect, removeCartItem);

// ✅ Coupon routes
router.post("/apply-coupon", protect, applyCoupon);
router.delete("/remove-coupon", protect, removeCoupon);

export default router;
