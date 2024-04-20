import axios from "axios";

const client = {
  f: axios.create({
    baseURL: "http://192.168.0.13:3000",
  }),
  l: axios.create({
    baseURL: "http://www.linkoking.com",
  }),
};

export default client.l;
