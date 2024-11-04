import { Router } from "express";
import { createUser, login, logout } from "../controllers/auth.controllers";
import { validateJoi } from "../middlewares/validate.Joi.middleware";
import { loginSchema, registerSchema } from "../utils/joiSchema/auth.schema";
import httpRequest from "../enum/http.request.enum";

const router = Router();

router.post(
  "/register",
  validateJoi(registerSchema, httpRequest.body),
  createUser
);

router.post("/login", validateJoi(loginSchema, httpRequest.body), login);

router.post("/logout", logout);

export default router;
