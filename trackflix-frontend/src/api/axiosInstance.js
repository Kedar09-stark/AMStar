// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Change this in production
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Optional: Add interceptors for request/response logging, auth, error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // You can customize error handling here (logging, notifications, etc)
    return Promise.reject(error);
  }
);

export default axiosInstance;
