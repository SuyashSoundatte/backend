const User = require("../models/user.model");

const fs = require("fs");
const path = require("path");

 

exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      preferences: user.preferences,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfilePic = async (req, res) => {
  try {
    const { userId } = req.params;
    const profilePicPath = req.file.path;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.profilePic) {
      fs.unlinkSync(path.join(__dirname, "..", user.profilePic));
    }

    user.profilePic = profilePicPath;
    await user.save();

    res.json({
      message: "Profile picture updated successfully",
      profilePic: profilePicPath,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password, phoneNumber, preferences } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, password, phoneNumber, preferences },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
