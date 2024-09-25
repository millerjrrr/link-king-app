import { useDispatch, useSelector } from "react-redux";
import {
  getAuthState,
  updateBusyState,
  updateConnectedState,
  updateLoggedInState,
  updateToken,
  updateTrialDays,
  updateVip,
} from "../store/auth";
import { useEffect, useState } from "react";
import colors from "../utils/colors";
import client from "../api/client";
import catchAsyncError from "../api/catchError";
import {
  getFromAsyncStorage,
  saveToAsyncStorage,
} from "../utils/asyncStorage";
import { updateSettings } from "../store/settings";
import { AppState, StatusBar } from "react-native";
import { authErrorHandler } from "../errors/authErrorHandler";
import * as Localization from "expo-localization";
import logOut from "../utils/logOut";
import { useNavigation } from "@react-navigation/native";

const AppNavigatorUseEffects = () => {
  const { refresh } = useSelector(getAuthState);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [appState, setAppState] = useState(
    AppState.currentState,
  );

  const daysLeft = (date) => {
    const today = new Date();
    const input = new Date(date);
    const timeDif = Math.abs(today - input);
    const daysDif = Math.floor(
      timeDif / (1000 * 60 * 60 * 24),
    );
    return 7 - daysDif;
  };

  useEffect(() => {
    const fetchAuthInfo = async () => {
      dispatch(updateBusyState(true));
      try {
        let appLang =
          (await getFromAsyncStorage("app-lang")) || false;

        if (!appLang) {
          appLang =
            Localization.getLocales()[0]?.languageCode ||
            "en";
          await saveToAsyncStorage("app-lang", appLang);
          dispatch(updateSettings({ appLang }));
        }

        const token =
          await getFromAsyncStorage("auth-token");
        if (!token) {
          dispatch(updateBusyState(false));
          return;
        }
        // if there is no token stored on device exit

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

        const {
          userCreationDate: ucd,
          vip,
          homeLanguage,
        } = data;

        if (data.status === "success") {
          dispatch(updateTrialDays(daysLeft(ucd)));
          dispatch(updateVip(new Date(vip).getTime() || 0));
          dispatch(updateBusyState(false));
          dispatch(updateToken(token));
          dispatch(updateLoggedInState(true));
          if (appLang !== homeLanguage) {
            saveToAsyncStorage("app-lang", homeLanguage);
            dispatch(
              updateSettings({ appLang: homeLanguage }),
            );
          }
        }
      } catch (error) {
        dispatch(updateBusyState(false));
        // if we are not logged in, just show the login page
        // if it times out we want to show the disconnected page
        const errorMessage = catchAsyncError(error);
        if (errorMessage.startsWith("timeout"))
          dispatch(updateConnectedState(false));
        else {
          authErrorHandler(error, dispatch);
          logOut(dispatch);
        }
      }
    };

    const fetchSettings = async () => {
      dispatch(updateBusyState(true));
      try {
        const colorScheme =
          (await getFromAsyncStorage("color-scheme")) ||
          "dark";
        const { STATUSBAR } = colors[colorScheme];
        StatusBar.setBarStyle(STATUSBAR);
        let timeGoal =
          await getFromAsyncStorage("time-goal");
        timeGoal = "" ? "" : timeGoal * 1;
        let newWordsGoal = await getFromAsyncStorage(
          "new-words-goal",
        );
        newWordsGoal = "" ? "" : newWordsGoal * 1;
        let stepsGoal =
          await getFromAsyncStorage("steps-goal");
        stepsGoal = "" ? "" : stepsGoal * 1;

        const settings = {
          colorScheme,
          timeGoal,
          newWordsGoal,
          stepsGoal,
        };

        Object.keys(settings).forEach((key) => {
          if (settings[key]) {
            dispatch(
              updateSettings({ [key]: settings[key] }),
            );
          }
        });
      } catch (error) {
        authErrorHandler(error, dispatch);
      }
    };

    fetchSettings();
    fetchAuthInfo();
  }, [appState, navigation, refresh]);
};

export default AppNavigatorUseEffects;
