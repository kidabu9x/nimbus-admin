import axios from "axios";
import qs from "qs";

axios.defaults.paramsSerializer = params =>
  qs.stringify(params, {
    arrayFormat: "brackets",
    encode: false
  });
const BASE_API_URL = process.env.NODE_ENV === "development" ? `http://localhost:3001/api/v1` : `https://api.nimbus.edu.vn/api/v1`;

console.log(BASE_API_URL);

const rootApi = axios.create({
  baseURL: BASE_API_URL
});

export default rootApi;
