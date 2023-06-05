import axios from "axios";
import env from "react-dotenv";
import sign from "jwt-encode";
const routeValidation = (url) => {
  return sign({ url }, process.env.REACT_APP_SECRET_KEY);
};
const ApiService = axios.create({
  // baseURL: 'https://jsonplaceholder.typicode.com/'
  baseURL: process.env.REACT_APP_API_URL
});
ApiService.interceptors.request.use(
  async (config) => {
    const token = JSON.parse(
      JSON.parse(localStorage.getItem("persist:root")).auth
    ).token;

    const xToken = routeValidation(process.env.REACT_APP_API_URL + config.url);
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3YxL2xvZ2luIn0.owV3S63JjpHbBfxcisi7AIuwnf8VEjrJmj1ctIGV0-c'

    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";
    config.headers[process.env.REACT_APP_X_AUTH_KEY] = xToken
    config.headers["X-FROM"] = "DO";
    if (config.file) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    //console.log("Request Error:", error);
    return Promise.reject(error);
  }
);

ApiService.interceptors.response.use(
  (response) => {
    if(response.statusText =="OK" || response.status === 200 ) {
      return response?.data || {};
    }
  },
  (error) => {
    // console.log("Response Error:", error);
    return error;
  }
);

export default ApiService;
