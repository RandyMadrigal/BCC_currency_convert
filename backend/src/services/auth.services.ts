import IUSER from "../interfaces/user.interface";
import * as authRepository from "../repositories/auth.repository";
import { hashPassword, comparePassword } from "../utils/bcrypt.handle";

export const createUser = async (userData: IUSER) => {
  const { password, ...data } = userData;
  try {
    //validar si el nombre de usuario ya esta en uso
    const userName = await authRepository.findByUserName(userData.userName);
    if (userName) throw new Error("User name is already in use");

    //validar si el nombre de usuario ya esta en uso
    const userEmail = await authRepository.findByEmail(userData.email);
    if (userEmail) throw new Error("Email is already in use");

    //encryptar contraseña
    const encryptedPassword = await hashPassword(userData?.password);

    const newUser: IUSER = { ...data, password: encryptedPassword } as IUSER;

    const user = await authRepository.create(newUser);

    return user;
  } catch (err) {
    throw err;
  }
};

export const login = async (userName: string, password: string) => {
  try {
    const user = await authRepository.findByUserName(userName);
    if (!user) throw new Error("Incorrect user name");

    const isPasswordValid = await comparePassword(password, user?.password);

    if (!isPasswordValid) throw new Error("Incorrect Password");

    const userData = {
      id: user._id,
      userName: user.userName,
      role: user.role,
      isActive: user.isActive,
    };

    return userData;
  } catch (err) {
    throw err;
  }
};
