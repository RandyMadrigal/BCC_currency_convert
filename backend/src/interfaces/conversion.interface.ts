import { Document, Types } from "mongoose";

interface ICONVERSION extends Document {
  _id: Types.ObjectId;
  amount: number;
  from: string;
  to: string;
  result: number;
  userId: string;
}

export default ICONVERSION;
