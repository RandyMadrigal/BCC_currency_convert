import mongoose, { Schema, model } from "mongoose";
import ICONVERSION from "../interfaces/conversion.interface";

const conversionSchema = new Schema<ICONVERSION>(
  {
    amount: { type: Number, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    result: { type: Number, required: true },
    userId: { type: String, ref: "users", required: true },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export default model("conversions", conversionSchema);
