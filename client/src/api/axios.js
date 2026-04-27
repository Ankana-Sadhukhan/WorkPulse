// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:3000/api', // Adjust based on your server
// });

// export default api;

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const checkIn = (userId) =>
  API.post("/attendance/checkin", { userId });

export const checkOut = (userId) =>
  API.post("/attendance/checkout", { userId });

export const updateActivity = (userId, status) =>
  API.post("/activity", { userId, status });

// ✅ ADD THIS
export const getActivity = () =>
  API.get("/activity");


export const registerUser = (data) =>
  API.post("/users/register", data);   // ✅ FIXED

export const loginUser = (data) =>
  API.post("/users/login", data);     // ✅ FIXED

export default API;