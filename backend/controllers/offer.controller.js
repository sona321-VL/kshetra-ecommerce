import Product from "../models/Product.js";

// APPLY OFFER
export const applyOfferToProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { discountType, discountValue, offerTitle, expiryDate } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let offerPrice = product.price;

    if (discountType === "PERCENT") {
      offerPrice = product.price - (product.price * discountValue) / 100;
    } 
    else if (discountType === "FLAT") {
      offerPrice = product.price - discountValue;
    }

    if (offerPrice < 0) offerPrice = 0;

    product.offer = {
      isActive: true,
      discountType,
      discountValue,
      offerPrice: Math.round(offerPrice),
      offerTitle: offerTitle || "",
      expiryDate: expiryDate || null
    };

    await product.save();

    res.status(200).json({
      message: "Offer applied successfully",
      product
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// REMOVE OFFER
export const removeOfferFromProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.offer = {
      isActive: false,
      discountType: "PERCENT",
      discountValue: 0,
      offerPrice: 0,
      offerTitle: "",
      expiryDate: null
    };

    await product.save();

    res.status(200).json({
      message: "Offer removed successfully",
      product
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
