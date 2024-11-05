import IUSER from "../interfaces/user.interface";
import userModel from "../model/user.model";

export const create = async (userData: IUSER) => {
  const user = await userModel.create(userData);
  return user.save();
};

export const findByUserName = async (userName: string) => {
  const user = await userModel.findOne({ userName: userName });
  return user || null;
};

export const findByEmail = async (email: string) => {
  const user = await userModel.findOne({ email: email });
  return user;
};
