import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : "http://localhost:3000/",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return error;
  },
);

instance.interceptors.response.use((response) => {
  if (response.status === 204) {
    return true;
  }
  return response.data;
});

export default instance;
