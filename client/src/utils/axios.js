import axios from 'axios';

// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_URL
// });
// const API = axios.create({
//   baseURL: 'http://localhost:5000/api'
// });

// Add token automatically if exists
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = token;
//   return config;
// });

// export default API;


const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// Add token automatically if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = token;
  return config;
});

export default API;

