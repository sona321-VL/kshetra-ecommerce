import express from "express";
import {
  getAllUsers,
  deleteUser,
} from "../controllers/adminController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===== USERS ===== */

router.get("/", protect, admin, getAllUsers);
router.delete("/:id", protect, admin, deleteUser);

export default router;
