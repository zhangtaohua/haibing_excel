import request from "@/utils/network/request";
import { AxiosRequestConfig } from "axios";

export function registerRequest(data: any) {
  const reqOption: AxiosRequestConfig = {
    url: "/api/v1/auth/signup/using-phone-email",
    method: "POST",
    data: data,
  };

  return request(reqOption);
}

export function loginRequest(data: any) {
  const reqOption: AxiosRequestConfig = {
    url: "/api/v1/auth/login/using-password",
    method: "POST",
    data: data,
  };

  return request(reqOption);
}

export function refreshTokenRequest() {
  const reqOption: AxiosRequestConfig = {
    url: "/api/v1/auth/login/refresh-token",
    method: "POST",
  };

  return request(reqOption);
}

export function getCurrentRequest() {
  const reqOption: AxiosRequestConfig = {
    url: "/api/v1/user",
    method: "GET",
  };

  return request(reqOption);
}

export function getAllUserstRequest() {
  const reqOption: AxiosRequestConfig = {
    url: "/api/v1/users",
    method: "GET",
  };

  return request(reqOption);
}

export function getUsersSearchRequest(params: any) {
  const reqOption: AxiosRequestConfig = {
    url: "/api/v1/users/search",
    method: "GET",
    params: params,
  };

  return request(reqOption);
}
