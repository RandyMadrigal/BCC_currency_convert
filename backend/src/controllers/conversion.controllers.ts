import { Request, Response } from "express";
import conversionSchema from "../model/conversion.model";
import exchangeSchema from "../model/exchangeRate.model";

// Controlador para realizar la conversión de monedas
//from = desde || to = a || amount = monto...

export const convertCurrency = async (req: Request, res: Response) => {
  const { from, to, amount } = req.body;

  try {
    // Buscar las tasas de cambio para las monedas proporcionadas
    const fromRate = await exchangeSchema.findOne({ name: from });
    const toRate = await exchangeSchema.findOne({ name: to });

    // Verificar si se encontraron las tasas de cambio
    if (!fromRate || !toRate) {
      res.status(404).json({ msg: "One or both currencies not found" });
      return;
    }

    // Realizar la conversión
    const convertedAmount = (amount / fromRate.value) * toRate.value;

    // Devolver el resultado
    res.status(200).json({
      msg: "Conversion successful",
      from,
      to,
      amount,
      convertedAmount: convertedAmount + ` ${toRate.name}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred during conversion" });
  }
};
