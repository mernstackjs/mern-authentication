import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
export const createNewUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password)
      return res.status(404).json({
        success: false,
        message: "Missed requirments !",
      });
    const isFound = await User.findOne({ email });
    if (isFound)
      return res.status(404).json({
        success: false,
        message: "Already is registered this user !",
      });
    const user = await User.create({ fullName, email, password });
    res.status(201).json({
      success: true,
      message: "user is registered successfull",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(404).json({
        success: false,
        message: "Missed requirments !",
      });
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Don't found this user!",
      });
    const isMatched = await user.comparePassword(password);
    if (!isMatched)
      return res.status(404).json({
        success: false,
        message: "Invalid credintion !",
      });
    const token = jwt.sign({ ssid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("Access-token", token);

    const { password: pass, ...others } = user._doc;
    res.status(200).json({
      success: true,
      message: "login is successfull",
      user: others,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Don't found this user!",
      });
    res.status(200).json({
      success: true,
      message: "current user",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("Access-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error during logout",
      error: error.message,
    });
  }
};
