import * as exchangeRepository from "../Repositories/exchangeRate.repository";
import IEXCHANGERATE from "../interfaces/exchangeRate.interface";

export const getRate = async (rate: string) => {
  try {
    return await exchangeRepository.findRate(rate);
  } catch (err) {
    throw err;
  }
};

export const createExchange = async (exchangeData: IEXCHANGERATE) => {
  const { name, value } = exchangeData;
  try {
    //validar si el nombre  ya esta en uso
    const rateName = await exchangeRepository.findRate(name);
    if (rateName) throw new Error("rate name is already in use");

    const newRate: IEXCHANGERATE = { name, value };

    const rate = await exchangeRepository.createRate(newRate);

    return rate;
  } catch (err) {
    throw err;
  }
};

export const getRates = async () => {
  try {
    return await exchangeRepository.findRates();
  } catch (err) {
    throw err;
  }
};

export const getRateById = async (id: string) => {
  try {
    return await exchangeRepository.findRateById(id);
  } catch (err) {
    throw err;
  }
};

export const updateRate = async (data: IEXCHANGERATE, id: string) => {
  try {
    const update = await exchangeRepository.updateRate(data, id);

    return update;
  } catch (err) {
    throw err;
  }
};

export const deleteRate = async (id: string) => {
  try {
    const deleted = await exchangeRepository.deleteRate(id);
    return deleted;
  } catch (err) {
    throw err;
  }
};
