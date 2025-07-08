import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { getAccessToken, logoutUser } from '../auth/authUtils'; // adjust based on your project structure

const baseURL = 'http://127.0.0.1:8000'; // or your API base

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
axiosInstance.interceptors.request.use(async (req) => {
  const token = getAccessToken(); // Read from localStorage or context

  if (token) {
    const decoded = jwt_decode(token);
    const isExpired = dayjs.unix(decoded.exp).isBefore(dayjs());

    if (isExpired) {
      logoutUser(); // clear token + redirect
      throw new axios.Cancel('Token expired');
    }

    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default axiosInstance;


//get sums for bets

export const fetchBetSummary = async () => {
  const res = await axiosInstance.get('/api/summary/');
  return res.data;
};