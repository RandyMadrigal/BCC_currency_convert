import { Document, Types } from "mongoose";

interface ICONVERSION extends Document {
  _id: Types.ObjectId;
  monto: string;
  monedaOrigen: string;
  monedaDestino: string;
  resultado: string;
  userId: Types.ObjectId;
}

export default ICONVERSION;
