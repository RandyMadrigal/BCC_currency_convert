import { Router } from "express";
import {
  getExchangeRates,
  getExchangeRateById,
  updateExchangeRate,
  deleteExchangeRate,
  createExchangeRate,
} from "../controllers/exchangeRate.controllers";

const router = Router();

router.get("/exchange-Rate", getExchangeRates); //get all exchange rates
router.get("/exchange-Rate/:id", getExchangeRateById); //get exchange rate
router.post("/exchange-Rate", createExchangeRate); // create exchange rate
router.put("/exchange-Rate/:id", updateExchangeRate); //update exchange rate
router.delete("/exchange-Rate/:id", deleteExchangeRate); // delete exchange rate

export default router;
