import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://backend-jeyh.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject JWT token into requests
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;