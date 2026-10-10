import axios from 'axios';

const axiosClient = axios.create({
  // Change baseURL to use the Vite environment variable with the Render backend fallback:
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://backend-jeyh.onrender.com/api',
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