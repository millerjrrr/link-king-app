import axios, { AxiosInstance } from "axios";
import { Platform } from "react-native";

const ProductionServer =
  "https://link-king-server-45d9668bd474.herokuapp.com";
const LocalHost = "http://localhost:3001";
const LocalIP = "http://192.168.1.64:3001";

const baseURL =
  process.env.NODE_ENV === "production"
    ? ProductionServer
    : ProductionServer;

const client: AxiosInstance = axios.create({
  baseURL,
});

export default client;
