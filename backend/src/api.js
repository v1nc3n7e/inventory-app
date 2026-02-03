// src/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchInventory = () => apiClient.get('/inventory');
export const getItem = (id) => apiClient.get(`/inventory/${id}`);
export const createItem = (item) => apiClient.post('/inventory', item);
export const updateItem = (id, item) => apiClient.put(`/inventory/${id}`, item);
export const deleteItem = (id) => apiClient.delete(`/inventory/${id}`);

export const login = (credentials) => apiClient.post('/auth/login', credentials);

export default apiClient;