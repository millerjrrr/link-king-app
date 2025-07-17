import axios, { AxiosInstance } from "axios";
import { Platform } from "react-native";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.link-king.com" // Production server
    : Platform.OS === "web"
      ? "http://localhost:3001"
      : // : "http://192.168.1.86:3001"; // Development server
        "https://api.link-king.com"; //sometimes still want liveServer

const client: AxiosInstance = axios.create({
  baseURL,
});

export default client;
