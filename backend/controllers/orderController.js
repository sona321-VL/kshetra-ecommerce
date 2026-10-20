import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

/* =========================
   CREATE ORDER
========================= */
export const createOrder = async (req, res) => {
  console.log("🔥 NEW ORDER CONTROLLER HIT 🔥");

  try {

    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (!req.body.shippingAddress) {
      return res.status(400).json({ message: "Shipping address required" });
    }

    const user = await User.findById(req.user._id);

    /* =========================
       BUILD ORDER ITEMS + STOCK CHECK
    ========================= */

    const orderItems = [];

    for (const item of cart.items) {

      const product = item.product;

      if (!product) {
        throw new Error("Product not found");
      }

      /* ⭐ STOCK CHECK */
      if (product.stock <= 0) {
        throw new Error(`${product.name} is out of stock`);
      }

      if (item.quantity > product.stock) {
        throw new Error(
          `Only ${product.stock} items left for ${product.name}`
        );
      }

      const isOfferActive = product.offer?.isActive;

      const finalPrice = isOfferActive
        ? product.offer.offerPrice
        : product.price;

      orderItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: finalPrice,
        originalPrice: product.price,
        image: product.images?.[0] || "",
        selectedSize: item.selectedSize || "",
        selectedColor: item.selectedColor || "",
        offerTitle: isOfferActive ? product.offer.offerTitle : "",
      });

    }

    /* =========================
       CALCULATE PRICES
    ========================= */

    const itemsPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    let totalPrice = itemsPrice;
    let discountAmount = 0;
    let appliedCoupon = null;

    /* =========================
       WELCOME COUPON LOGIC
    ========================= */

    const { couponCode } = req.body;

    if (couponCode) {

      const coupon = user.welcomeCoupon;

      if (!coupon) {
        return res.status(400).json({ message: "No coupon available." });
      }

      if (coupon.code !== couponCode) {
        return res.status(400).json({ message: "Invalid coupon code." });
      }

      if (coupon.isUsed) {
        return res.status(400).json({
          message: "Welcome coupon already used.",
        });
      }

      if (new Date() > coupon.expiryDate) {
        return res.status(400).json({
          message: "Welcome coupon expired.",
        });
      }

      if (coupon.discountType === "PERCENT") {
        discountAmount = (itemsPrice * coupon.discountValue) / 100;
      } else {
        discountAmount = coupon.discountValue;
      }

      if (discountAmount > itemsPrice) {
        discountAmount = itemsPrice;
      }

      totalPrice = itemsPrice - discountAmount;

      appliedCoupon = coupon.code;

      user.welcomeCoupon.isUsed = true;

      await user.save();
    }

    /* =========================
       CREATE ORDER
    ========================= */

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice,
      discountAmount,
      couponCode: appliedCoupon,
      totalPrice,
      isPaid: false,
      isDelivered: false,
    });

    /* =========================
       REDUCE PRODUCT STOCK
    ========================= */

    for (const item of cart.items) {

      const product = await Product.findById(item.product._id);

      if (product) {
        product.stock -= item.quantity;
        await product.save();
      }

    }

    /* =========================
       CLEAR CART
    ========================= */

    cart.items = [];
    await cart.save();

    res.status(201).json(order);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message || "Order creation failed"
    });

  }
};


/* =========================
   GET MY ORDERS
========================= */
export const getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders"
    });
  }
};


/* =========================
   GET ORDER BY ID
========================= */
export const getOrderById = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id)
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json(order);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch order"
    });
  }
};


/* =========================
   GET MY ORDERS COUNT
========================= */
export const getMyOrdersCount = async (req, res) => {
  try {

    const count = await Order.countDocuments({
      user: req.user._id
    });

    res.json({ count });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders count"
    });
  }
};


/* =========================
   GET TOTAL SPENT
========================= */
export const getTotalSpent = async (req, res) => {
  try {

    const result = await Order.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: null,
          totalSpent: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalSpent = result[0]?.totalSpent || 0;

    res.json({ totalSpent });

  } catch (error) {
    res.status(500).json({
      message: "Failed to calculate total spent"
    });
  }
};