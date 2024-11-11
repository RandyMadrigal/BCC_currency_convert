import conversionSchema from "../model/conversion.model";
import ICONVERSION from "../interfaces/conversion.interface";

export const create = async (newConversion: ICONVERSION) => {
  const conversion = await conversionSchema.create(newConversion);
  return conversion.save();
};

export const findConversionByUserId = async (userId: string) => {
  const history = await conversionSchema
    .find({ userId: userId })
    .populate("userId", {
      password: 0,
      isActive: 0,
      _id: 0,
      name: 0,
      email: 0,
      createdAt: 0,
    });
  return history || null;
};
