import { useDispatch, useSelector } from "react-redux";
import {
  getAuthState,
  updateBusyState,
  updateConnectedState,
  updateLoggedInState,
  updateToken,
} from "../store/auth";
import { useEffect } from "react";
import colors from "../utils/colors";
import client from "../api/client";
import catchAsyncError from "../api/catchError";
import { getFromAsyncStorage } from "../utils/asyncStorage";
import { updateSettings } from "../store/settings";
import { StatusBar } from "react-native";
import { authErrorHandler } from "../errors/authErrorHandler";
import * as Localization from "expo-localization";

const AppNavigatorUseEffects = () => {
  const { refresh } = useSelector(getAuthState);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuthInfo = async () => {
      dispatch(updateBusyState(true));
      try {
        const token =
          await getFromAsyncStorage("auth-token");
        if (!token) {
          dispatch(updateBusyState(false));
          return;
        }
        // if there is no token stored on device exit

        const { data } = await client.get(
          "/api/users/log-in-confirmation",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
            timeout: 3000,
          },
        );
        if (data.status === "success") {
          dispatch(updateBusyState(false));
          dispatch(updateToken(token));
          dispatch(updateLoggedInState(true));
        }
      } catch (error) {
        dispatch(updateBusyState(false));
        // if we are not logged in, just show the login page
        // if it times out we want to show the disconnected page
        const errorMessage = catchAsyncError(error);
        if (errorMessage.startsWith("timeout"))
          dispatch(updateConnectedState(false));
      }
    };

    const fetchSettings = async () => {
      dispatch(updateBusyState(true));
      try {
        const colorScheme =
          await getFromAsyncStorage("color-scheme");
        StatusBar.setBarStyle(
          colors[colorScheme].STATUSBAR,
        );
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

        const appLang =
          Localization.getLocales()[0].languageCode;

        const settings = {
          colorScheme,
          timeGoal,
          newWordsGoal,
          stepsGoal,
          appLang,
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
  }, [refresh]);
};

export default AppNavigatorUseEffects;
