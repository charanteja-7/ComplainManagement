// src/api/axios.ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api', // change this to your live server if deployed
});

// Add token to headers automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
