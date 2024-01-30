import { getFromAsyncStorage } from "../utils/asyncStorage";
import client from "./client";

const clientWithAuth = async (url, type) => {
  const token = await getFromAsyncStorage("auth-token");

  return client[type](url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export default clientWithAuth;
