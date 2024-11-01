import { Router } from "express";
import { convertCurrency } from "../controllers/conversion.controllers";

const router = Router();

router.post("/convert-currency", convertCurrency); //realizar conversion

export default router;
