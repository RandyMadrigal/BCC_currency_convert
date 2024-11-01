import IEXCHANGERATE from "../interfaces/exchangeRate.interface";
import exchangeSchema from "../model/exchangeRate.model";

//find in db if the rate exist
export const findRate = async (rate: string) => {
  const fromRate = await exchangeSchema.findOne({ name: rate });
  return fromRate || null;
};

export const createRate = async (nexExchangeRate: IEXCHANGERATE) => {
  const exchangeRate = await exchangeSchema.create(nexExchangeRate);
  return exchangeRate.save();
};

export const findRates = async () => {
  const fromRate = await exchangeSchema.find({});
  return fromRate || null;
};

export const findRateById = async (id: string) => {
  const fromRate = await exchangeSchema.findOne({ _id: id });
  return fromRate || null;
};

export const updateRate = async (data: IEXCHANGERATE, id: string) => {
  const { name, value } = data;
  const update = await exchangeSchema.findByIdAndUpdate(
    id,
    { name: name, value: value },
    { new: true, runValidators: true }
  );

  return update;
};

export const deleteRate = async (id: string) => {
  const fromRate = await exchangeSchema.findByIdAndDelete(id);
  return fromRate;
};
