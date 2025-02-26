import { useDispatch } from "react-redux";
import { updateConnectedState } from "@src/store/auth";
import client from "@src/api/client";
import {
  getFromAsyncStorage,
  saveToAsyncStorage,
  secureGetFromAsyncStorage,
} from "@src/utils/asyncStorage";
import { updateSettings } from "@src/store/settings";
import useCatchAsync from "../utilityHooks/useCatchAsync";
import * as Localization from "expo-localization";
import useUpdateAuthData from "./useUpdateAuthData";

const useFetchAuthInfo = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();
  const updateAuthData = useUpdateAuthData();

  const fetchAuthInfo = catchAsync(async () => {
    //console.log("# Fetching Auth Info");
    try {
      let appLang =
        (await getFromAsyncStorage("app-lang")) || false;

      if (appLang) dispatch(updateSettings({ appLang }));
      else {
        appLang =
          Localization.getLocales()[0]?.languageCode ||
          "en";
        await saveToAsyncStorage("app-lang", appLang);
        dispatch(updateSettings({ appLang }));
      }

      const token =
        await secureGetFromAsyncStorage("auth-token");

      // if there is no token stored on device exit
      if (!token) {
        return;
      }

      const { data } = await client.get(
        "/api/v1/users/log-in-confirmation",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Accept-Language": appLang,
          },
          timeout: 3000,
        },
      );

      if (data.status === "success") updateAuthData(data);
    } catch (e) {
      if (e instanceof Error) {
        if (e.message.startsWith("timeout"))
          dispatch(updateConnectedState("disconnected"));
        else if (e.message.endsWith("503"))
          dispatch(updateConnectedState("maintenance"));
        else dispatch(updateConnectedState("unknown"));
      } else {
        console.log("other error");
      }
    }
  });

  return fetchAuthInfo;
};

export default useFetchAuthInfo;
