import axios from "axios";

export const baseUrl = "http://192.168.68.102:9700";
export const apiBaseUrl = `${baseUrl}/api`;
export const apiAxios = axios.create({
    baseURL: apiBaseUrl
});