import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const authentication = async (req, res, next) => {
  const token = req.cookies["Access-token"];

  try {
    if (!token)
      return res
        .status(400)
        .json({ success: false, message: "You don't have access token" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.ssid);
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Don't found this user!",
      });
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "You don't have verify token",
    });
  }
};
