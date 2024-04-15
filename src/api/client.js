import axios from "axios";

const client = {
  f: axios.create({
    baseURL: "https://192.168.0.13:3000",
  }),
  l: axios.create({
    baseURL: "https://www.linkoking.com",
  }),
  a: axios.create({
    baseURL: "http://www.linkoking.com",
  }),
};

export default client.a;
