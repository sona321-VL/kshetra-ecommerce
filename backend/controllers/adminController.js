import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

// ================= DASHBOARD =================
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();

    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    res.json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue: totalRevenue[0]?.total || 0,
    });

  } catch (error) {
    res.status(500).json({ message: "Dashboard data failed" });
  }
};

// ================= USERS =================
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User removed" });
};

// ================= ORDERS =================


/* =========================================
   GET ALL ORDERS (ADMIN)
========================================= */
export const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};


/* =========================================
   UPDATE ORDER (ADMIN)
========================================= */
export const updateOrderAdmin = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update payment status
    if (req.body.isPaid !== undefined) {
      order.isPaid = req.body.isPaid;
    }

    // Update delivery status
    if (req.body.isDelivered !== undefined) {
      order.isDelivered = req.body.isDelivered;
    }

    const updatedOrder = await order.save();

    res.json(updatedOrder);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update order" });
  }
};


/* =========================================
   DELETE ORDER (ADMIN)
========================================= */
export const deleteOrderAdmin = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.deleteOne();

    res.json({ message: "Order deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete order" });
  }
};
