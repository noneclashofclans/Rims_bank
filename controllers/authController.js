const User = require('../models/User');
const jwt = require('jsonwebtoken');
const emailService = require('../services/emailService');
const Blacklist = require('../models/blacklist');

const user_registration_controller = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user_exists = await User.findOne({ email });
    if (user_exists) {
      return res.status(422).json({ message: "User already exists with email.", status: "failed" });
    }

    const new_user = await User.create({ name, email, password });
    if (!new_user) return res.status(500).json({ message: "Failed to create user" });

    const token = jwt.sign({ userId: new_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({
      user: { _id: new_user._id, email: new_user.email, name: new_user.name },
      token
    });

    await emailService.sendRegistrationEmail(new_user.email, new_user.name);
  } catch (err) {
    return res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

const user_login_controller = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: "Email or password is INVALID" });
    }

    const is_valid_password = await user.comparePassword(password);
    if (!is_valid_password) {
      return res.status(401).json({ message: "Email or password is INVALID" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({
      user: { _id: user._id, email: user.email, name: user.name },
      token
    });
  } catch (err) {
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
};

async function userLogoutController(req, res) {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.clearCookie("token");
      return res.status(200).json({ message: "User logged out successfully" });
    }

    await Blacklist.create({ token });
    res.clearCookie("token");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Logout failed", error: err.message });
  }
}

module.exports = {
  user_registration_controller,
  user_login_controller,
  userLogoutController
};