import axios, { AxiosInstance } from "axios";
import { Platform } from "react-native";

const ProductionServer = "https://api.link-king.com";
const LocalHost = "http://localhost:3001";
const LocalIP = "http://192.168.1.68:3001";

const baseURL =
  process.env.NODE_ENV === "production"
    ? ProductionServer
    : Platform.OS === "web"
      ? LocalHost
      : LocalIP; // Windows IP
// "http://192.168.1.111:3001"; // Mac IP
// "https://api.link-king.com"; //sometimes still want liveServer

const client: AxiosInstance = axios.create({
  baseURL,
});

export default client;
