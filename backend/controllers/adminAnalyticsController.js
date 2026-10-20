import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const getDashboardAnalytics = async (req, res) => {
  try {
 


    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenueResult = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};
export const getRevenueByMonth = async (req, res) => {
  try {
    const revenue = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$totalPrice" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    res.json(revenue);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch monthly revenue" });
  }
};
export const getOrderStatusAnalytics = async (req, res) => {
  try {
    const paidOrders = await Order.countDocuments({ isPaid: true });
    const unpaidOrders = await Order.countDocuments({ isPaid: false });
    const delivered = await Order.countDocuments({ isDelivered: true });
    const pendingDelivery = await Order.countDocuments({ isDelivered: false });

    res.json({
      paidOrders,
      unpaidOrders,
      delivered,
      pendingDelivery,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order analytics" });
  }
};
export const getTopSellingProducts = async (req, res) => {
  try {
     
    const topProducts = await Order.aggregate([
      { $unwind: "$orderItems" },
      {
        $group: {
          _id: "$orderItems.product",
          totalSold: { $sum: "$orderItems.quantity" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
    ]);

    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch top products" });
  }
};
