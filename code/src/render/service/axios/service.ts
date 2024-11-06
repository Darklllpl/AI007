import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { config } from "./config";
import { ElMessage } from "element-plus";

const { resultCode, baseUrl } = config;
// export const PATH_URL ='/api'
// @ts-ignore
export const PATH_URL = baseUrl[import.meta.env.VITE_API_URL];

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL, // api 的 baseUrl
  timeout: config.requestTimeout, // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    return config;
  },
  (error: AxiosError) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (response.config.responseType === "blob") {
      // 如果是文件流，直接过
      return response;
    } else if (response.data.code === resultCode) {
      return response.data;
    } else {
      ElMessage.error(response.data.message);
    }
  },
  (error: AxiosError) => {
    console.log("err" + error); // for debug
    ElMessage.error(error.message);
    return Promise.reject(error);
  }
);

export { service };
