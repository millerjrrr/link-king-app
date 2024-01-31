import { getFromAsyncStorage } from "../utils/asyncStorage";
import client from "./client";

const clientWithAuth = {
  post: async (url, data) => {
    const token = await getFromAsyncStorage("auth-token");

    return client.post(url, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  get: async (url) => {
    const token = await getFromAsyncStorage("auth-token");

    return client.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
};

export default clientWithAuth;
