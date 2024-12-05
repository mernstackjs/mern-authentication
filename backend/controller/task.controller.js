import Task from "../model/task.model.js";

export const createTask = async (req, res, next) => {
  const { title, desc, status } = req.body;
  try {
    if (!title || !desc || !status)
      return res.status(404).json({
        success: false,
        message: "Missed requirments !",
      });
    const task = new Task({ title, desc, status, owner: req.user._id });
    await task.save();
    res.status(201).json({
      success: true,
      message: "new task is added",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};
