import axios from "axios";

const client = {
  local: axios.create({
    baseURL: "http://192.168.0.13:3000",
  }),
  live: axios.create({
    baseURL: "http://www.linkoking.com",
  }),
};

export default client.live;
