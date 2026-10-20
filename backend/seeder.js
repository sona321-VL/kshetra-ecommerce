import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const products = [
  {
    name: "Royal Silk Saree",
    price: 4999,
    description: "Handwoven silk saree crafted by traditional artisans.",
    images: ["/images/su.jpg"],
    sizes: ["S", "M", "L"],
    category: "Handloom Wears",
  },
  {
    name: "Temple Gold Necklace",
    price: 7999,
    description: "Classic temple jewelry inspired by South Indian heritage.",
    images: ["/images/jewel.jpg"],
    sizes: [],
    category: "Jewelry",
  },
  {
    name: "Heritage Brass Lamp",
    price: 2999,
    description: "Traditional handcrafted brass lamp for royal interiors.",
    images: ["/images/e.jpg"],
    sizes: [],
    category: "Home-decors",
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
