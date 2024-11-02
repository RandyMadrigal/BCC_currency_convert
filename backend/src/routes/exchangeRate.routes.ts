import { Router } from "express";
import {
  getExchangeRates,
  getExchangeRateById,
  updateExchangeRate,
  deleteExchangeRate,
  createExchangeRate,
} from "../controllers/exchangeRate.controllers";

const router = Router();

router.get("/exchange-rate", getExchangeRates); //get all exchange rates
router.get("/exchange-rate/:id", getExchangeRateById); //get exchange rate
router.post("/exchange-rate", createExchangeRate); // create exchange rate
router.put("/exchange-rate/:id", updateExchangeRate); //update exchange rate
router.delete("/exchange-rate/:id", deleteExchangeRate); // delete exchange rate

export default router;
