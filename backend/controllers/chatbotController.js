import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { detectIntent } from "../services/intentService.js";

export const chatWithBot = async (req, res) => {
  try {

    const { message, userId } = req.body;

    //const userId = req.user?._id;
  

    if (!message) {
      return res.json({
        reply: "⚠ Please enter a message."
      });
    }

    const lowerMsg = message.toLowerCase();

    // ===== AI INTENT DETECTION =====
    const intent = detectIntent(lowerMsg);

    // ===== GREETING =====
    if (
      lowerMsg.includes("hi") ||
      lowerMsg.includes("hello") ||
      lowerMsg.includes("hey")
    ) {
      return res.json({
        reply:
          "👑 Welcome to Kshetra Royal Heritage.\nYou can ask about products, track orders, or get recommendations."
      });
    }

    // ===== ORDER TRACKING =====
    if (intent === "order_tracking") {

      if (!userId) {
        return res.json({
          reply: "👑 Please login to track your order."
        });
      }

      const order = await Order.findOne({ user: userId })
        .sort({ createdAt: -1 });

      if (!order) {
        return res.json({
          reply: "🪔 No recent orders found."
        });
      }

      const status = order.isDelivered
        ? "Delivered ✅"
        : order.isPaid
        ? "Paid & Processing 📦"
        : "Pending Payment 💳";

      return res.json({
        reply: `📦 Order Details`,
        orderDetails: order,
        status
      });
    }

    // ===== PRODUCT SEARCH =====
    if (intent === "product_search") {

      const keywords = lowerMsg.split(" ");

      const products = await Product.find({
        $or: [
          { name: { $regex: keywords.join("|"), $options: "i" } },
          { category: { $regex: keywords.join("|"), $options: "i" } },
          { tags: { $in: keywords } }
        ]
      }).limit(10);

      if (products.length === 0) {
        return res.json({
          reply: "🪔 I couldn't find matching products."
        });
      }

      return res.json({
        reply: "✨ Here are products you may like:",
        products
      });
    }

    // ===== RECOMMENDATION =====
    if (intent === "recommendation") {

      const products = await Product.find()
        .sort({ rating: -1 })
        .limit(5);

      return res.json({
        reply: "✨ Our most loved products:",
        products
      });
    }

    // ===== PRICE QUESTION =====
    if (intent === "price") {
      return res.json({
        reply:
          "💎 Our collections range from ₹2,999 to ₹25,000 depending on craftsmanship."
      });
    }

    // ===== FALLBACK PRODUCT SEARCH =====
    const fallbackProducts = await Product.find({
      name: { $regex: lowerMsg, $options: "i" }
    }).limit(5);

    if (fallbackProducts.length > 0) {
      return res.json({
        reply: "✨ Here are some products:",
        products: fallbackProducts
      });
    }

    // ===== DEFAULT RESPONSE =====
    return res.json({
      reply:
        "🪔 I'm here to help. Try asking:\n• Show silk sarees\n• Track my order\n• Recommend products"
    });

  } catch (error) {

    console.error("Chatbot Error:", error);

    res.status(500).json({
      reply: "⚠ Royal system temporarily unavailable."
    });

  }
};