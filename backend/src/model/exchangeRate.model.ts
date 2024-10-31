import { Schema, model } from "mongoose";
import IEXCHANGERATE from "../interfaces/exchangeRate.interface";

const exchangeRateSchema = new Schema<IEXCHANGERATE>(
  {
    name: { type: String, required: true, unique: true, uppercase: true },
    value: { type: Number, required: true },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export default model("exchangeRate", exchangeRateSchema);
