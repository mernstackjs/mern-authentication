import User from "../model/user.model.js";

export const createNewUser = async (req, res) => {
  const { firstName, email, password } = req.body;
  try {
    if (!firstName || !email || !password)
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
    const user = await User.create({ firstName, email, password });
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
