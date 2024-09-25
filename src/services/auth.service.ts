import axios from 'axios';
import { VITE_TAKS_SERVICE_URL } from './config';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${VITE_TAKS_SERVICE_URL}/api/login`, {
      email,
      password
    });
    //verify the response
    const data = response.data;
    //Save user information
    localStorage.setItem('userToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Error. usuario y/o contraseña incorrecta');
  }
};

export const registerUser = async (name: string, email: string, password: string, confirm_password: string, role: string) => {
  try {
    const response = await axios.post(`${VITE_TAKS_SERVICE_URL}/api/register`, {
      name,
      email,
      password,
      password_confirmation: confirm_password,
      role
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error during regiter:', error);
    throw new Error('Error. Please verify your register data.');
  }
};
