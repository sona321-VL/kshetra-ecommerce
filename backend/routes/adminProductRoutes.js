import express from "express";

import {
  createProductAdmin,
  updateProductAdmin,
  deleteProductAdmin,
  updateStockAdmin,
  getProducts
} from "../controllers/productController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ADMIN */

router.get("/", protect, admin, getProducts);   // ⭐ ADD THIS

router.post("/", protect, admin, createProductAdmin);

router.put("/:id", protect, admin, updateProductAdmin);

router.put("/:id/stock", protect, admin, updateStockAdmin);

router.delete("/:id", protect, admin, deleteProductAdmin);

export default router;