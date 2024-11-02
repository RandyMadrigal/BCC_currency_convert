import { Router } from "express";
import { createUser, login, logout } from "../controllers/auth.controllers";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", createUser);

export default router;
