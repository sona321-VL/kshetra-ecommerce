import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const getRecommendations = async (req, res) => {
  try {
    const { userId } = req.query;

    // ===== 1️⃣ Trending Products (Most Ordered) =====
    const trending = await Product.find()
      .sort({ sold: -1 })
      .limit(5);

    // ===== 2️⃣ If User Logged In =====
    if (userId) {
      const userOrders = await Order.find({ user: userId });

      if (userOrders.length > 0) {
        const lastOrder = userOrders[userOrders.length - 1];

        const category = lastOrder.orderItems[0]?.category;

        const related = await Product.find({
          category
        }).limit(5);

        return res.json({
          type: "personalized",
          products: related
        });
      }
    }

    // ===== Default Trending =====
    res.json({
      type: "trending",
      products: trending
    });

  } catch (error) {
    res.status(500).json({ message: "Recommendation error" });
  }
};
