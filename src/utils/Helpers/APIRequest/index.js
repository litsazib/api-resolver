import axios from "axios";
import env from "react-dotenv";
// import jwt from "jsonwebtoken";
// const routeValidation = (url) => {
//   return jwt.sign({ url }, process.env.SECRET_KEY);
// };

const ApiService = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
  // baseURL: process.env.API_URL,
});
ApiService.interceptors.request.use(
  async (config) => {
    // const token = JSON.parse(
    //   JSON.parse(localStorage.getItem("persist:root")).auth
    // ).token;

    // const xToken = routeValidation(process.env.API_URL + "/" + config.url);

    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";
    // config.headers[process.env.X_AUTH_KEY] = xToken;
    config.headers["X-FROM"] = "DO";
    if (config.file) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    // if (token) {
    //   config.headers.Authorization = "Bearer " + token;
    // }

    return config;
  },
  (error) => {
    //console.log("Request Error:", error);
    return Promise.reject(error);
  }
);

ApiService.interceptors.response.use(
  (response) => {
    return response?.data || {};
  },
  (error) => {
    // console.log("Response Error:", error);
    return Promise.reject(error);
  }
);

export default ApiService;
