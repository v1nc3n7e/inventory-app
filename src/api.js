// src/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor to attach the token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchInventory = () => apiClient.get('/inventory');
export const getItem = (id) => apiClient.get(`/inventory/${id}`);
export const createItem = (item) => apiClient.post('/inventory', item);
export const updateItem = (id, item) => apiClient.put(`/inventory/${id}`, item);
export const deleteItem = (id) => apiClient.delete(`/inventory/${id}`);

export const login = (credentials) => apiClient.post('/auth/login', credentials);
export const register = (userData) => apiClient.post('/auth/register', userData);

export default apiClient;
