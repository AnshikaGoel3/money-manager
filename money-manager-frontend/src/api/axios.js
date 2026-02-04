// src/api/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://money-manager-backend1.onrender.com'
  //'http://localhost:8080/api', // MUST include /api for your JwtAuthFilter
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;