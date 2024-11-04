import conversionSchema from "../model/conversion.model";
import ICONVERSION from "../interfaces/conversion.interface";

export const create = async (newConversion: ICONVERSION) => {
  const conversion = await conversionSchema.create(newConversion);
  return conversion.save();
};

export const findConversionByUserId = async (userId: string) => {
  const history = await conversionSchema
    .find({ userId: userId })
    .populate("userId");
  return history || null;
};
