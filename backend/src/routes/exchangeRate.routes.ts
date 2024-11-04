import { Router } from "express";
import {
  getExchangeRates,
  getExchangeRateById,
  updateExchangeRate,
  deleteExchangeRate,
  createExchangeRate,
} from "../controllers/exchangeRate.controllers";
import httpRequest from "../enum/http.request.enum";
import { exchangeBodySchema } from "../utils/joiSchema/exchangeRate.schema";
import { validateJoi } from "../middlewares/validate.Joi.middleware";

const router = Router();

router.get("/exchange-rate", getExchangeRates); //get all exchange rates

router.get("/exchange-rate/:id", getExchangeRateById); //get exchange rate

router.post(
  "/exchange-rate",
  validateJoi(exchangeBodySchema, httpRequest.body),
  createExchangeRate
); // create exchange rate

router.put(
  "/exchange-rate/:id",
  validateJoi(exchangeBodySchema, httpRequest.body),
  updateExchangeRate
); //update exchange rate

router.delete("/exchange-rate/:id", deleteExchangeRate); // delete exchange rate

export default router;
