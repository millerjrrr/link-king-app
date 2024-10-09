import axios from "axios";

const client = {
  f: axios.create({
    baseURL: "http://172.20.10.3:3000",
  }),
  l: axios.create({
    baseURL: "https://www.linkoking.com",
  }),
};

export default client.l;
