import { Request, Response } from "express";
import * as authService from "../services/auth.services";
import { createToken } from "../utils/jwt.handle";
import { sendMail } from "../utils/sendMail.handle";
import Roles from "../enum/roles.enum";
import IUSER from "../interfaces/user.interface";
import handleHttpError from "../utils/errors.handle";
import { AppError } from "../types/errors";

export const createUser = async (req: Request, res: Response) => {
  const { name, userName, email, password, isActive } = req.body;

  try {
    const user = await authService.createUser({
      name,
      userName,
      email,
      password,
      isActive,
      role: Roles.user,
    } as IUSER);

    if (user) {
      res.status(201).json({ msg: "user created successfully" });
      await sendMail(user.email, user.name);
      return;
    }

    res.status(400).json({ msg: "User not created" });
    return;
  } catch (err) {
    handleHttpError(res, err as AppError);
  }
};

export const login = async (req: Request, res: Response) => {
  const { userName, password } = req.body;

  try {
    const user = (await authService.login(userName, password)) as IUSER;

    if (user) {
      //create token
      const token = createToken(user);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Solo true en HTTPS
      });
      res.status(201).json({
        message: `Login successful, Hi ${user.userName}`,
        token: token,
        user: user,
      });
    }
  } catch (err) {
    handleHttpError(res, err as AppError);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("access_token").json({ message: "logout successful" });
};
