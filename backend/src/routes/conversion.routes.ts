import { Router } from "express";
import {
  convertCurrency,
  getConversions,
} from "../controllers/conversion.controllers";
import { validateJoi } from "../middlewares/validate.Joi.middleware";
import { convertCurrencyBody } from "../utils/joiSchema/conversion.schema";
import httpRequest from "../enum/http.request.enum";

const router = Router();

router.get("/convert-currency-history/:userId", getConversions); //obtener historial de conversiones por usuario

router.post(
  "/convert-currency",
  validateJoi(convertCurrencyBody, httpRequest.body),
  convertCurrency
); //realizar conversion

export default router;
