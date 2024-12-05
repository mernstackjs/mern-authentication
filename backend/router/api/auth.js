import { Router } from "express";
import { createNewUser } from "../../controller/auth.controller.js";

const router = Router();

router.post("/register", createNewUser);

export default router;
