import axios from "axios";

// create an axios instance
const service = axios.create({
  baseURL: process.env.API_URL, // url = base url + request url
  // withCredentials: true, // send Storages when cross-domain requests
  timeout: 15000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config: any) => {
    config.headers["Authorization"] =
      "Bearer " + sessionStorage.getItem("OToken");
    return config;
  },
  (error: any) => {
    return Promise.reject(error.message);
  }
);

// response interceptor
service.interceptors.response.use(
  (response: any) => {
    const res = response.data;
    if (res.StatusCode === 200 && res.Success) {
      return res;
    } else {
      if (res?.StatusCode === 401) {
        window.location.href = "/page401";
      } else {
        if (response.status) {
          return response.data;
        }
        alert(res.Message);
      }
    }
  },
  (error: any) => {
    console.log(error);

    // if (error.response.status === 401) {
    //   window.location.href = "/page401";
    // } else {
    //   console.log(error);
    // }
  }
);

export default service;
