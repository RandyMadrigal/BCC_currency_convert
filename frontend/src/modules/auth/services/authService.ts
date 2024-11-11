import axios from '../../../lib/axios';
import { User } from '../types/authTypes';

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post('/auth/login', { userName: username, password });
    return {
      token: response.data.token,
      user: response.data.user as User, // Suponiendo que la API devuelve un objeto `user` con rol
    };
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
