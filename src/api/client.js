import axios from "axios";

const client = {
  local: axios.create({
    baseURL: "http://192.168.1.64:3000",
  }),
  live: axios.create({
    baseURL: "http://www.linkoking.com",
  }),
};

export default client.local;
