import axios from "axios";

export const baseUrl = "http://localhost:5000";
export const apiBaseUrl = `${baseUrl}/api`;
export const apiAxios = axios.create({
    baseURL: apiBaseUrl
});