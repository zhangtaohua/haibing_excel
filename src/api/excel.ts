import request from "@/utils/network/request";
import { AxiosRequestConfig } from "axios";

export function getAllExcelRequest(params: any) {
  const reqOption: AxiosRequestConfig = {
    url: "/api/v1/excels",
    method: "GET",
    params: params,
  };

  return request(reqOption);
}

export function downloadExcelRequest(params: any) {
  const reqOption: AxiosRequestConfig = {
    url: "/api/v1/excels/download",
    method: "GET",
    params: params,
  };

  return request(reqOption);
}

export function createExcelRequest(data: any) {
  const reqOption: AxiosRequestConfig = {
    url: "/api/v1/excels",
    method: "POST",
    data: data,
  };

  return request(reqOption);
}

export function updateExcelRequest(tableName: any, id: any, data: any) {
  const reqOption: AxiosRequestConfig = {
    url: `/api/v1/excels/${tableName}/${id}`,
    method: "PATCH",
    data: data,
  };

  return request(reqOption);
}

export function deleteExcelRequest(tableName: any, id: any) {
  const reqOption: AxiosRequestConfig = {
    url: `/api/v1/excels/${tableName}/${id}`,
    method: "DELETE",
  };

  return request(reqOption);
}
