import Joi from "joi";

export const convertCurrencyBody = Joi.object({
  from: Joi.string().trim().required(),
  to: Joi.string().required(),
  amount: Joi.number().required(),
  userId: Joi.string().trim().required(),
});
