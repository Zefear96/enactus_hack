import axios from "axios";
import { API_URL } from "./constants";
import { storageGetItem } from "./storage";

export const baseAxios = axios.create({
    baseURL: API_URL
})

// baseAxios.interceptors.request.use(async (config) => {
//     const token = await storageGetItem("app.accessToken");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, error => Promise.reject(error));

