import { Request, Response } from "express";
import { getRate } from "../services/exchangeRate.services";
import * as conversionService from "../services/conversion.services";
import ICONVERSION from "../interfaces/conversion.interface";
import handleHttpError from "../utils/errors.handle";
import { AppError } from "../types/errors";

//from = desde || to = a || amount = monto...

export const convertCurrency = async (req: Request, res: Response) => {
  const { from, to, amount, userId } = req.body;

  try {
    // Buscar las tasas de cambio para las monedas proporcionadas
    const fromRate = await getRate(from);
    const toRate = await getRate(to);

    // Verificar si se encontraron las tasas de cambio
    if (!fromRate || !toRate) {
      res.status(404).json({ msg: "One or both currencies not found" });
      return;
    }

    // Realizar la conversión
    const result = (amount / fromRate.value) * toRate.value;

    const newConversion = {
      amount,
      from,
      to,
      result,
      userId,
    } as ICONVERSION;

    //guardar en la bd
    const create = await conversionService.createConversion(newConversion);

    // Devolver el resultado
    res.status(200).json({
      msg: "Conversion successful",
      from,
      to,
      amount,
      result: result + ` ${toRate.name}`,
      created_at: new Date().toLocaleDateString(),
    });
  } catch (err) {
    handleHttpError(res, err as AppError);
  }
};

export const getConversions = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const history = await conversionService.getUserConversions(userId);

    // Devolver el resultado
    res.status(200).json({
      msg: "History",
      result: history,
    });
  } catch (error) {
    handleHttpError(res, error as AppError);
  }
};
