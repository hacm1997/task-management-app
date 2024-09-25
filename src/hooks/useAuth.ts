import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from './types';

export const useAuth = () => {
  const [user, setUser] = useState<UserData>({
    created_at: '',
    email: '',
    id: 0,
    name: '',
    role: '',});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }else{
      navigate('/');
    }
  }, []);

  const login = (userData: any) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser({
      created_at: '',
      email: '',
      id: 0,
      name: '',
      role: '',
    });
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
  };

  return { user, login, logout };
};
