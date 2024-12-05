import { Router } from "express";

const router = Router();
import authRoute from "./api/auth.js";
import taskRoute from "./api/task.js";
router.use("/auth", authRoute);
router.use("/task", taskRoute);

export default router;
