import express from "express";
import { applyOfferToProduct, removeOfferFromProduct } from "../controllers/offer.controller.js";

const router = express.Router();

// Apply offer
router.put("/apply/:productId", applyOfferToProduct);

// Remove offer
router.put("/remove/:productId", removeOfferFromProduct);

export default router;
