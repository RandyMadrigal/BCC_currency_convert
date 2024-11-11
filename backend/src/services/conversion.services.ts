import * as conversionRepository from "../Repositories/conversion.repositoy";
import ICONVERSION from "../interfaces/conversion.interface";
import { AppError } from "../types/errors";

export const createConversion = async (conversionData: ICONVERSION) => {
  const { amount, from, to, result, userId } = conversionData;
  try {
    const newConversion: ICONVERSION = {
      amount,
      from,
      to,
      result,
      userId,
    } as ICONVERSION;

    const conversion = await conversionRepository.create(newConversion);
    console.log(conversion);

    return conversion;
  } catch (err) {
    throw new AppError("Error creating conversion", 500);
  }
};

export const getUserConversions = async (userId: string) => {
  try {
    return await conversionRepository.findConversionByUserId(userId);
  } catch (err) {
    throw new AppError("Error obtaining conversion history", 500);
  }
};
