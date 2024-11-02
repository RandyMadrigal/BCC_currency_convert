import { sign, verify } from "jsonwebtoken";
import IUSER from "../interfaces/user.interface";

export const createToken = (userData: IUSER) => {
  const { name, userName } = userData;
  const payload = {
    name,
    userName,
  };

  const jwt_secret =
    process.env.JWT_SECRET || "LONG_TEXT_TO_MY_JSON_WEB_TOKEN_SECRET";

  return sign(payload, jwt_secret, { expiresIn: "1h" });
};

export const verifyToken = (token: string, secret: string) => {
  return verify(token, secret);
};
