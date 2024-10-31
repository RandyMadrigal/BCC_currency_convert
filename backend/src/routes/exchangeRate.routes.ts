import { Router } from "express";
import {
  getExchangeRates,
  getExchangeRateById,
  updateExchangeRate,
  deleteExchangeRate,
  createExchangeRate,
} from "../controllers/exchangeRate.controllers";

const router = Router();

router.get("/exchangeRate", getExchangeRates); //get all exchange rates
router.get("/exchangeRate/:id", getExchangeRateById); //get exchange rate
router.post("/exchangeRate", createExchangeRate); // create exchange rate
router.put("/exchangeRate/:id", updateExchangeRate); //update exchange rate
router.delete("/exchangeRate/:id", deleteExchangeRate); // delete exchange rate

export default router;
