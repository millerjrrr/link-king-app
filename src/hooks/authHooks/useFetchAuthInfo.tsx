import { useDispatch } from "react-redux";
import {
  updateBusyState,
  updateLoggedInState,
  updateToken,
  updateTrialDays,
  updateVip,
} from "@src/store/auth";
import client from "@src/api/client";
import {
  getFromAsyncStorage,
  saveToAsyncStorage,
} from "@src/utils/asyncStorage";
import { updateSettings } from "@src/store/settings";
import daysLeft from "@src/utils/daysLeft";
import useCatchAsync from "../useCatchAsync";
import * as Localization from "expo-localization";

const useFetchAuthInfo = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();

  const fetchAuthInfo = catchAsync(async () => {
    // console.log("# Fetching Auth Info");
    let appLang =
      (await getFromAsyncStorage("app-lang")) || false;

    if (appLang) dispatch(updateSettings({ appLang }));
    else {
      appLang =
        Localization.getLocales()[0]?.languageCode || "en";
      await saveToAsyncStorage("app-lang", appLang);
      dispatch(updateSettings({ appLang }));
    }

    const token = await getFromAsyncStorage("auth-token");

    // if there is no token stored on device exit
    if (!token) {
      dispatch(updateBusyState(false));
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

    const { userCreationDate, vip, homeLanguage } = data;

    if (data.status === "success") {
      dispatch(updateTrialDays(daysLeft(userCreationDate)));
      dispatch(updateVip(new Date(vip).getTime() || 0));
      dispatch(updateBusyState(false));
      dispatch(updateToken(token));
      dispatch(updateLoggedInState(true));
      if (appLang !== homeLanguage) {
        saveToAsyncStorage("app-lang", homeLanguage);
        dispatch(updateSettings({ appLang: homeLanguage }));
      }
    }
  });

  return fetchAuthInfo;
};

export default useFetchAuthInfo;
