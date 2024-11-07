import IUSER from "../interfaces/user.interface";
import * as authRepository from "../Repositories/auth.repository";
import { hashPassword, comparePassword } from "../utils/bcrypt.handle";
import { AppError } from "../types/errors";

export const createUser = async (userData: IUSER) => {
  const { password, ...data } = userData;
  //validar si el nombre de usuario ya esta en uso
  const userName = await authRepository.findByUserName(userData.userName);
  if (userName) throw new AppError("User name is already in use", 409);

  //validar si el nombre de usuario ya esta en uso
  const userEmail = await authRepository.findByEmail(userData.email);
  if (userEmail) throw new AppError("Email is already in use", 409);

  try {
    //encryptar contraseña
    const encryptedPassword = await hashPassword(userData?.password);
    const newUser: IUSER = { ...data, password: encryptedPassword } as IUSER;
    const user = await authRepository.create(newUser);

    return user;
  } catch (err) {
    throw new AppError("Error creating user", 500);
  }
};

export const login = async (userName: string, password: string) => {
  const user = await authRepository.findByUserName(userName);
  if (!user) throw new AppError("Incorrect user name", 401);

  const isPasswordValid = await comparePassword(password, user?.password);

  if (!isPasswordValid) throw new AppError("Incorrect Password", 401);

  const userData = {
    id: user._id,
    userName: user.userName,
    role: user.role,
    isActive: user.isActive,
  };

  return userData;
};
