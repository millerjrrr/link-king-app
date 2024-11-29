import { getFromAsyncStorage } from "@src/utils/asyncStorage";
import client from "./client";
import * as Localization from "expo-localization";
import { AxiosResponse } from "axios";

interface ClientWithAuth {
  post: (
    url: string,
    data: any,
  ) => Promise<AxiosResponse<any>>;
  get: (url: string) => Promise<AxiosResponse<any>>;
}
const clientWithAuth: ClientWithAuth = {
  post: async (url: string, data: any) => {
    //console.log("# API Request");
    const token = await getFromAsyncStorage("auth-token");
    const appLang =
      Localization.getLocales()[0]?.languageCode || "en";

    return client.post(url, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Accept-Language": appLang,
        "Local-Time-US-Format": new Date().toLocaleString(
          "en-US",
          {
            hour12: false,
          },
        ),
      },
      timeout: 5000,
    });
  },
  get: async (url: string) => {
    //console.log("# API Request");
    const token = await getFromAsyncStorage("auth-token");
    const appLang =
      Localization.getLocales()[0]?.languageCode || "en";

    return client.get(url, {
      headers: {
        Authorization: "Bearer " + token,
        "Accept-Language": appLang,
        "Local-Time-US-Format": new Date().toLocaleString(
          "en-US",
          {
            hour12: false,
          },
        ),
      },
      timeout: 5000,
    });
  },
};

export default clientWithAuth;
