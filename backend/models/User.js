import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // 🎁 Welcome Coupon System
    welcomeCoupon: {
      code: { type: String, default: "WELCOME10" },
      discountType: {
        type: String,
        enum: ["PERCENT", "FLAT"],
        default: "PERCENT",
      },
      discountValue: { type: Number, default: 10 },
      isUsed: { type: Boolean, default: false },
      expiryDate: {
        type: Date,
        default: () =>
          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    },
  },
  { timestamps: true }
);

/* =========================
   🔐 HASH PASSWORD BEFORE SAVE
========================= */
userSchema.pre("save", async function () {
  // Only hash if password is modified
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/* =========================
   🔑 COMPARE PASSWORD METHOD
========================= */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);