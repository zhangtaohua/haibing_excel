import request from "@/utils/network/request";
import { AxiosRequestConfig } from "axios";

export function getDataByUrl(url: string) {
  const reqOption: AxiosRequestConfig = {
    url: url,
    method: "GET",
  };

  return request(reqOption);
}
