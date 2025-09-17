import axios from "axios";
require('dotenv').config();

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const api = axios.create({
    baseURL: baseURL,
    headers: {
    "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      console.log(token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
);

export default api;
