import { decode } from "querystring";
import { verifyToken } from "../utils/jwt.handle";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Roles from "../enum/roles.enum";

export const validateJwt = (role: Roles.user | Roles.admin) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    const secret =
      process.env.JWT_SECRET ||
      "LONG_TEXT_TO_SAVE_MY_MOST_VALUABLE_TOKEN_sECRET";

    if (!token) {
      res.status(401).json({ msg: "access token is missing" });
      return;
    }

    try {
      const decoded = verifyToken(token, secret) as JwtPayload;

      if (decoded.role === role || decoded.role === Roles.admin) {
        next();
      } else {
        res.status(403).json({ msg: "Invalid Token for this action" });
        return;
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(409).json({ msg: err.message });
        return;
      }
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  };
};
