import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: String,
  rating: Number,
  comment: String
});

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number, // original price
    category: String,
    images: [String],
    sizes: [String],
    colors: [
    {
      name: String,
      hex: String
    }
  ],
 stock: {
    type: Number,
    default: 0
  },

  lowStockAlert: {
    type: Number,
    default: 5
  },


    // ⭐ Offer System Added Here
    offer: {
      isActive: { type: Boolean, default: false },
      discountType: { 
        type: String, 
        enum: ["PERCENT", "FLAT"], 
        default: "PERCENT" 
      },
      discountValue: { type: Number, default: 0 },
      offerPrice: { type: Number, default: 0 },
      offerTitle: { type: String, default: "" },
      expiryDate: { type: Date, default: null }
    },

    rating: { type: Number, default: 0 },
    reviews: [reviewSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
