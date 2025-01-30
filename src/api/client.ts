import axios, { AxiosInstance } from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.link-king.com" // Production server
    : "http://192.168.1.64:3001"; // Development server

const client: AxiosInstance = axios.create({
  baseURL,
});

export default client;
