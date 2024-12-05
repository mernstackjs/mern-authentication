import { Router } from "express";
import {
  createNewUser,
  currentUser,
  login,
  logout,
} from "../../controller/auth.controller.js";
import { authentication } from "../../utility/authentication.js";

const router = Router();

router.post("/register", createNewUser);
router.post("/login", login);
router.get("/current-user", authentication, currentUser);
router.post("/logout", authentication, logout);

export default router;
