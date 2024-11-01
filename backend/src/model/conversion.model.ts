import { Schema, model } from "mongoose";
import ICONVERSION from "../interfaces/conversion.interface";

const conversionSchema = new Schema<ICONVERSION>(
  {
    monto: { type: String, required: true },
    monedaOrigen: { type: String, required: true, unique: true },
    monedaDestino: { type: String, required: true, unique: true },
    resultado: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export default model("conversion", conversionSchema);
