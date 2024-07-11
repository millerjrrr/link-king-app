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
        "Local-Time": new Date().toLocaleString("en-GB", {
          hour12: false,
        }),
      },
      timeout: 5000,
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
        "Local-Time": new Date().toLocaleString("en-GB", {
          hour12: false,
        }),
      },
      timeout: 5000,
    });
  },
};

export default clientWithAuth;
