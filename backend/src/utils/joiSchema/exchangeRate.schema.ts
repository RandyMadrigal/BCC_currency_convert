import Joi from "joi";

export const exchangeBodySchema = Joi.object({
  name: Joi.string().trim().min(2).required(),
  value: Joi.number().required(),
});
