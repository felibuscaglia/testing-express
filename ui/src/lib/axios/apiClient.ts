import axios from "axios";

const API_CLIENT = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "x-api-key": process.env.REACT_APP_API_KEY,
  },
});

export { API_CLIENT };
