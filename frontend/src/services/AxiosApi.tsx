import axios from "axios";

export const AxiosApi = axios.create({
    baseURL: window.location.origin
});