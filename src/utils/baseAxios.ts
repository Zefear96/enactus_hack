import axios from "axios";
import { API_URL } from "./constants";

export const baseAxios = axios.create({
    baseURL: API_URL
})