import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import adminRoutes from "./routes/adminRoutes.js";
import adminProductRoutes from "./routes/adminProductRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";
import adminAnalyticsRoutes from "./routes/adminAnalyticsRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import recommendRoutes from "./routes/recommendRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";







dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

/* ===== STATIC IMAGES ===== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "images")));

/* ===== ROUTES ===== */
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/analytics", adminAnalyticsRoutes);
app.use("/api/admin/users",adminUserRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/recommend", recommendRoutes);

app.use("/api/offers", offerRoutes);




app.get("/", (req, res) => {
  res.send("Kshetra API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
