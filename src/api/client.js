import axios from "axios";

const client = {
  f: axios.create({
    baseURL: "http://192.168.1.77:3000",
  }),
  l: axios.create({
    baseURL: "https://www.linkoking.com",
  }),
};

export default client.l;
