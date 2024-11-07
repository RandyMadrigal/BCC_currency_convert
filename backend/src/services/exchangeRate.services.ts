import * as exchangeRepository from "../Repositories/exchangeRate.repository";
import IEXCHANGERATE from "../interfaces/exchangeRate.interface";
import { AppError } from "../types/errors";

export const getRate = async (rate: string) => {
  try {
    return await exchangeRepository.findRate(rate);
  } catch (err) {
    throw new AppError("No rate found", 404);
  }
};

export const createExchange = async (exchangeData: IEXCHANGERATE) => {
  const { name, value } = exchangeData;
  //validar si el nombre  ya esta en uso
  const rateName = await exchangeRepository.findRate(name);
  if (rateName) throw new AppError("rate name is already in use", 409);

  try {
    const newRate: IEXCHANGERATE = { name, value } as IEXCHANGERATE;

    const rate = await exchangeRepository.createRate(newRate);

    return rate;
  } catch (err) {
    throw new AppError("Error creating rate", 500);
  }
};

export const getRates = async () => {
  try {
    return await exchangeRepository.findRates();
  } catch (err) {
    throw new AppError("No rate found", 404);
  }
};

export const getRateById = async (id: string) => {
  try {
    return await exchangeRepository.findRateById(id);
  } catch (err) {
    throw new AppError("Rate not found", 404);
  }
};

export const updateRate = async (data: IEXCHANGERATE, id: string) => {
  try {
    const update = await exchangeRepository.updateRate(data, id);

    return update;
  } catch (err) {
    throw new AppError("Rate not found", 404);
  }
};

export const deleteRate = async (id: string) => {
  try {
    const deleted = await exchangeRepository.deleteRate(id);
    return deleted;
  } catch (err) {
    throw new AppError("Error deleting rate", 500);
  }
};
