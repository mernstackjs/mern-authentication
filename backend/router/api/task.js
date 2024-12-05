import { Router } from "express";
import { createTask } from "../../controller/task.controller.js";
import { authentication } from "../../utility/authentication.js";

const router = Router();

router.post("/", authentication, createTask);

export default router;
