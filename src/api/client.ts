import axios, { AxiosInstance } from "axios";
import { IP } from "@env";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.link-king.com" // Production server
    : IP; // Development server

const client: AxiosInstance = axios.create({
  baseURL,
});

export default client;
