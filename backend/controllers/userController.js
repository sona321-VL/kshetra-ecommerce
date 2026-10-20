import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};


/* =========================
    GET ALL USERS (Admin)
========================= */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/* =========================
   PROMOTE TO ADMIN
========================= */
export const promoteToAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(400).json({ message: "User already admin" });
    }

    user.role = "admin";
    await user.save();

    res.json({ message: "User promoted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Promotion failed" });
  }
};



export const demoteToUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent demoting yourself
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot demote yourself" });
    }

    user.role = "user";
    await user.save();

    res.json({ message: "User demoted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Demotion failed" });
  }
};

/* =========================
    DELETE USER
========================= */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent deleting yourself
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot delete yourself" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};