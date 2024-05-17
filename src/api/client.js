import axios from "axios";

const client = {
  f: axios.create({
    baseURL: "http://192.168.1.66:3000",
  }),
  l: axios.create({
    baseURL: "https://www.linkoking.com",
  }),
};

export default client.f;
