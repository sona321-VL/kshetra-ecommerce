import express from "express";
import {
  getUserProfile,
  getAllUsers,
  promoteToAdmin,
   demoteToUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

/* =========================
   👤 PROFILE
========================= */
router.get("/profile", protect, getUserProfile);

/* =========================
   🎁 WELCOME COUPON
========================= */
router.get("/welcome-coupon", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.welcomeCoupon);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch coupon" });
  }
});

/* =========================
   👑 ADMIN ROUTES
========================= */

// Get all users (for admin panel)
router.get("/", protect, adminOnly, getAllUsers);

// Promote user
router.put("/promote/:id", protect, adminOnly, promoteToAdmin);

router.put("/demote/:id", protect, adminOnly, demoteToUser);

// Delete user
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;