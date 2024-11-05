import { Router } from "express";
import { createUser, login, logout } from "../controllers/auth.controllers";
import { validateJoi } from "../middlewares/validate.Joi.middleware";
import { loginSchema, registerSchema } from "../utils/joiSchema/auth.schema";
import requestFrom from "../enum/requestFrom.enum";
import { validateJwt } from "../middlewares/validate.jwt.middleware";
import Roles from "../enum/roles.enum";

const router = Router();

router.post(
  "/register",
  validateJoi(registerSchema, requestFrom.body),
  createUser
);

router.post("/login", validateJoi(loginSchema, requestFrom.body), login);

router.post("/logout", validateJwt(Roles.user), logout);

export default router;
