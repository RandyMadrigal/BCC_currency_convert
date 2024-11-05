import { Router } from "express";
import {
  getExchangeRates,
  getExchangeRateById,
  updateExchangeRate,
  deleteExchangeRate,
  createExchangeRate,
} from "../controllers/exchangeRate.controllers";
import requestFrom from "../enum/requestFrom.enum";
import { exchangeBodySchema } from "../utils/joiSchema/exchangeRate.schema";
import { validateJoi } from "../middlewares/validate.Joi.middleware";
import { validateJwt } from "../middlewares/validate.jwt.middleware";
import Roles from "../enum/roles.enum";

const router = Router();

//Only the admin user can use this controller.

router.get("/exchange-rate", validateJwt(Roles.admin), getExchangeRates); //get all exchange rates

router.get("/exchange-rate/:id", validateJwt(Roles.admin), getExchangeRateById); //get exchange rate

router.post(
  "/exchange-rate",
  validateJwt(Roles.admin),
  validateJoi(exchangeBodySchema, requestFrom.body),
  createExchangeRate
); // create exchange rate

router.put(
  "/exchange-rate/:id",
  validateJwt(Roles.admin),
  validateJoi(exchangeBodySchema, requestFrom.body),
  updateExchangeRate
); //update exchange rate

router.delete(
  "/exchange-rate/:id",
  validateJwt(Roles.admin),
  deleteExchangeRate
); // delete exchange rate

export default router;
