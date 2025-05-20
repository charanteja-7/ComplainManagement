// src/api/auth.ts
import API from './axios';

export const login = (email: string, password: string) =>
  API.post('/auth/login', { email, password });

export const register = (name: string, email: string, password: string, role = 'student') =>
  API.post('/auth/register', { name, email, password, role });

export const getProfile = () => API.get('/auth/profile');
