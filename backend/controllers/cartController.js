import Cart from "../models/Cart.js";
import User from "../models/User.js";

import Product from "../models/Product.js";

// GET USER CART
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate("items.product");

  res.json(cart || { items: [] });
};

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, selectedSize } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    const itemExists = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.selectedSize === selectedSize
    );

    if (itemExists) {
      itemExists.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        selectedSize,
      });
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.log("ADD TO CART ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE CART ITEM
export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.product.toString() !== productId
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    res.json(updatedCart);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// REMOVE ITEM
export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    res.json(updatedCart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const applyCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Coupon code required" });
    }

    const user = await User.findById(req.user._id);
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    if (!cart.items || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (!user.welcomeCoupon) {
      return res.status(400).json({ message: "No coupon available" });
    }

    if (user.welcomeCoupon.isUsed) {
      return res.status(400).json({ message: "Coupon already used" });
    }

    if (user.welcomeCoupon.code !== code) {
      return res.status(400).json({ message: "Invalid coupon code" });
    }

    if (user.welcomeCoupon.expiryDate && user.welcomeCoupon.expiryDate < new Date()) {
      return res.status(400).json({ message: "Coupon expired" });
    }

    // ✅ subtotal (offer price included)
    const subtotal = cart.items.reduce((acc, item) => {
      const finalPrice = item.product?.offer?.isActive
        ? item.product.offer.offerPrice
        : item.product.price;

      return acc + finalPrice * item.quantity;
    }, 0);

    let discountAmount = 0;

    if (user.welcomeCoupon.discountType === "PERCENT") {
      discountAmount = (subtotal * user.welcomeCoupon.discountValue) / 100;
    } else {
      discountAmount = user.welcomeCoupon.discountValue;
    }

    // prevent discount bigger than subtotal
    if (discountAmount > subtotal) discountAmount = subtotal;

    cart.coupon = {
      code,
      discountAmount,
    };

    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    res.json({
      message: "Coupon applied successfully",
      cart: updatedCart,
      subtotal,
      discountAmount,
      totalAfterDiscount: subtotal - discountAmount,
    });

  } catch (error) {
    console.log("COUPON APPLY ERROR:", error);
    res.status(500).json({ message: "Failed to apply coupon" });
  }
};


export const removeCoupon = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.coupon = {
      code: "",
      discountAmount: 0,
    };

    await cart.save();

    res.json({ message: "Coupon removed", cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove coupon" });
  }
};
