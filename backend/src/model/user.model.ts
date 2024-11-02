import { Schema, model } from "mongoose";
import IUSER from "../interfaces/user.interface";

const userSchema = new Schema<IUSER>(
  {
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    role: { type: String, required: true, default: "user" },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export default model("users", userSchema);
