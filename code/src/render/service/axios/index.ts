import { service } from "./service";
import { AxiosRequestConfig } from "axios";

export default {
  get: <T = any>(
    url: string,
    options?: Pick<AxiosRequestConfig, "params">
  ): Promise<T> => {
    return service.get(url, {
      params: options?.params,
    });
  },
  post: <T = any>(
    url: string,
    options?: Pick<AxiosRequestConfig, "params" | "data">
  ): Promise<{ data: T }> => {
    return service.post(url, options.data, { params: options.params });
  },
};
