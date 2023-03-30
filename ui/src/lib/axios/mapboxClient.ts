import axios from "axios";
import { MAPBOX_BASE_API_URL } from "lib/constants";

const MAPBOX_API_CLIENT = axios.create({
  baseURL: MAPBOX_BASE_API_URL,
  params: {
    access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  },
});

export { MAPBOX_API_CLIENT };
