const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists, you can login" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    newUser.password = await bcrypt.hash(password, 10);

    await newUser.save();
    res.status(201).json({ message: "Signup Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong in auth.router.js", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist, Please signup!" });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(401).json({ message: "Password incorrect, Please Try Again" });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SEC,
      { expiresIn: "24h" }
    );

    res.status(200).json({ message: "Login Successfully!", jwtToken, email, name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong in auth.router.js", error });
  }
};

module.exports = { signup, login };
