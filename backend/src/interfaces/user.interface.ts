import { Document, Types } from "mongoose";

interface IUSER extends Document {
  _id: Types.ObjectId;
  name: string;
  userName: string;
  email: string;
  password: string;
  isActive: boolean;
  role: string;
}

export default IUSER;
