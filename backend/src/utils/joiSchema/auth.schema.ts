import Joi from "joi";

export const loginSchema = Joi.object({
  userName: Joi.string().trim().required(),
  password: Joi.string().required(),
});

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),
  userName: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
