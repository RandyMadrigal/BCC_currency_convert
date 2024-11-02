import { Document, Types } from "mongoose";

interface IEXCHANGERATE extends Document {
  _id: Types.ObjectId;
  name: string;
  value: number;
}

export default IEXCHANGERATE;
