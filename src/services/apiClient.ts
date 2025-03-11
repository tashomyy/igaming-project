import axios, { AxiosInstance } from "axios";

const urlBase: string = import.meta.env.VITE_API_URL || "";

export const apiClient: AxiosInstance = axios.create({ baseURL: urlBase });

// If we add login logic, we can add interceptors here
