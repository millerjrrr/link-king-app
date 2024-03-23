import { getFromAsyncStorage } from "../utils/asyncStorage";
import client from "./client";
import * as Localization from "expo-localization";

const clientWithAuth = {
  post: async (url, data) => {
    const token = await getFromAsyncStorage("auth-token");
    const appLang =
      Localization.getLocales()[0]?.languageCode || "en";

    return client.post(url, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Accept-Language": appLang,
      },
      timeout: 3000,
    });
  },
  get: async (url) => {
    const token = await getFromAsyncStorage("auth-token");
    const appLang =
      Localization.getLocales()[0]?.languageCode || "en";

    return client.get(url, {
      headers: {
        Authorization: "Bearer " + token,
        "Accept-Language": appLang,
      },
      timeout: 3000,
    });
  },
};

export default clientWithAuth;
