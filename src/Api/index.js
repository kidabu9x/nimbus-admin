import axios from "axios";
import qs from "qs";

axios.defaults.paramsSerializer = params =>
  qs.stringify(params, {
    arrayFormat: "brackets",
    encode: false
  });
const BASE_API_URL = `http://localhost:3001/api/v1`;

const rootApi = axios.create({
  baseURL: BASE_API_URL
});

export default rootApi;
