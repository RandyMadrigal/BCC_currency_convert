import { Router } from "express";
import {
  convertCurrency,
  getConversions,
} from "../controllers/conversion.controllers";
import { validateJoi } from "../middlewares/validate.Joi.middleware";
import { convertCurrencyBody } from "../utils/joiSchema/conversion.schema";
import requestFrom from "../enum/requestFrom.enum";
import { validateJwt } from "../middlewares/validate.jwt.middleware";
import Roles from "../enum/roles.enum";

const router = Router();

router.get(
  "/convert-currency-history/:userId",
  validateJwt(Roles.user),
  getConversions
); //obtener historial de conversiones por usuario

router.post(
  "/convert-currency",
  validateJwt(Roles.user),
  validateJoi(convertCurrencyBody, requestFrom.body),
  convertCurrency
); //realizar conversion

export default router;
