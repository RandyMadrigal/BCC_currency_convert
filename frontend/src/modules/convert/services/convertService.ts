import axios from '../../../lib/axios';
import { ConvertRequest, ConvertResponse } from '../types/convertTypes';

export const convertCurrency = async (data: ConvertRequest) => {
  try {
    const response = await axios.post<ConvertResponse>('/convert-currency', data);
    return response.data;
  } catch (error) {
    throw new Error(`Error al convertir la moneda: ${(error as Error).message}`);
  }
};