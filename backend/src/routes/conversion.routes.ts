import { Router } from "express";
import {
  convertCurrency,
  getConversions,
} from "../controllers/conversion.controllers";

const router = Router();

router.get("/convert-currency-history/:userId", getConversions); //obtener historial de conversiones por usuario
router.post("/convert-currency/:userId", convertCurrency); //realizar conversion

export default router;
