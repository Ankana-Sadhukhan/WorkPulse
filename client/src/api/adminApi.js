import axios from "axios";

const BASE = "http://localhost:5000/admin";

export const getUsers = () => axios.get(`${BASE}/users`);

export const getAttendance = (userId) =>
  axios.get(`${BASE}/attendance/${userId}`);

export const getActivity = (userId) =>
  axios.get(`${BASE}/activity/${userId}`);

export const getTotalHours = (userId) =>
  axios.get(`${BASE}/total-hours/${userId}`);