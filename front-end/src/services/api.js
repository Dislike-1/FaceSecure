import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';  // Adjust if you deploy to a different domain

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
