import axios, { AxiosInstance } from "axios";

// need to find a better way to do this
const client: { f: AxiosInstance; l: AxiosInstance } = {
  f: axios.create({
    baseURL: "http://192.168.8.109:3001",
  }),
  l: axios.create({
    baseURL: "https://www.linkoking.com",
  }),
};

export default client.f;
