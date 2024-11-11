import Joi, { required } from "joi";
import { Request, Response, NextFunction } from "express";

export const validateJoi = (
  schema: Joi.ObjectSchema,
  property: "body" | "query" | "params"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[property]);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    next();
  };
};
