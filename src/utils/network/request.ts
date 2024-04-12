import axios from "axios";
// import axios, { AxiosRequestConfig } from "axios";
import storage from "@/utils/storage/storage";
import globalVar from "@/utils/global/global";

// create an axios instance
const service = axios.create({
  baseURL: "", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 90000, // request timeout
});

// http request
service.interceptors.request.use((config) => {
  const token = storage.get("userToken");

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

// response interceptor
service.interceptors.response.use(
  (response: any) => {
    const res = response.data;
    // if the custom code is not 0, it is judged as an error.
    if (res.code && res.code !== 0) {
      return Promise.reject(new Error(res.msg || "Error"));
    } else {
      return res;
    }
  },
  (error: any) => {
    console.error("response错误拦截：", error.message);
    if (error.message.indexOf("401") > -1) {
      console.log("error 401");
      globalVar.loginOutFunc();
    }
    return Promise.reject(error);
  },
);

export default service;
