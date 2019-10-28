import axios from "axios";
import qs from "qs";

axios.defaults.paramsSerializer = params =>
  qs.stringify(params, {
    arrayFormat: "brackets",
    encode: false
  });

const BASE_API_URL = process.env.NODE_ENV === "development" ? `http://localhost:3001/api/v1` : `https://api.nimbus.edu.vn/api/v1`;

const rootApi = axios.create({
  baseURL: BASE_API_URL
});
rootApi.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  }
);

export default rootApi;
