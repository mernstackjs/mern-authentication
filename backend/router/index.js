import { Router } from "express";

const router = Router();
import authRoute from "./api/auth.js";
router.use("/auth", authRoute);

export default router;
