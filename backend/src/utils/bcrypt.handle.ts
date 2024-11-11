import { hash, compare } from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  const salt: number = 10;
  return await hash(password, salt);
};

export const comparePassword = async (
  password: string,
  encryptPassword: string
) => {
  return await compare(password, encryptPassword);
};
