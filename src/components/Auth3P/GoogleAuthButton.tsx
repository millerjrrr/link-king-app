import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import client from "@src/api/client";
import { useDispatch, useSelector } from "react-redux";
import {
  settingsState,
  updateSettings,
} from "@src/store/settings";
import {
  saveToAsyncStorage,
  secureSaveToAsyncStorage,
} from "@src/utils/asyncStorage";
import {
  updateEmail,
  updateJustSignedUp,
  updateLoggedInState,
  updateToken,
} from "@src/store/auth";
import useCatchAsync from "../../hooks/useCatchAsync";
import appTextSource from "@src/utils/appTextSource";

import Constants from "expo-constants";
import Auth3PButton from "./Auth3PButton";

type ExtraProps = {
  GOOGLE_WEB_CLIENT_ID?: string;
  GOOGLE_IOS_CLIENT_ID?: string;
  GOOGLE_ANDROID_CLIENT_ID?: string;
};

const extra: ExtraProps = Constants.expoConfig?.extra || {};

const {
  GOOGLE_WEB_CLIENT_ID = "",
  GOOGLE_IOS_CLIENT_ID = "",
  GOOGLE_ANDROID_CLIENT_ID = "",
} = extra;

declare function require(path: string): any;

const GoogleAuthButton = () => {
  const dispatch = useDispatch();
  const { appLang } = useSelector(settingsState);
  const { continueWithGoogle } =
    appTextSource(appLang).auth.signUp;

  const redirectUri = makeRedirectUri({
    scheme: "com.linkoking.app",
  });
  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession();
  }, []);

  const [request, response, promptAsync] =
    Google.useAuthRequest({
      clientId: GOOGLE_WEB_CLIENT_ID, // Web Client ID (for Expo Go)
      iosClientId: GOOGLE_IOS_CLIENT_ID, // iOS standalone builds
      androidClientId: GOOGLE_ANDROID_CLIENT_ID, // Android standalone builds
      redirectUri,
    });

  useEffect(() => {
    if (
      response?.type === "success" &&
      response.authentication?.idToken
    ) {
      const { idToken } = response.authentication;
      if (idToken) {
        loginWithGoogleToken(idToken);
      }
    }
  }, [response]);

  const catchAsync = useCatchAsync();

  const loginWithGoogleToken = catchAsync(
    async (idToken: string): Promise<void> => {
      if (
        GOOGLE_WEB_CLIENT_ID === "" ||
        GOOGLE_IOS_CLIENT_ID === "" ||
        GOOGLE_ANDROID_CLIENT_ID === ""
      )
        throw new Error(
          "Dev Error: Environment variables have not been set correctly",
        );
      const { data } = await client.post(
        "/api/v1/users/sign-in-with-google",
        {
          idToken,
        },
        {
          timeout: 3000,
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": appLang,
          },
        },
      );

      if (data.status === "success") {
        await secureSaveToAsyncStorage(
          "auth-token",
          data.token,
        );
        await saveToAsyncStorage(
          "app-lang",
          data.data.user.homeLanguage,
        );
        dispatch(
          updateSettings({
            appLang: data.data.user.homeLanguage,
          }),
        );
        dispatch(updateToken(data.token));
        dispatch(
          dispatch(
            updateJustSignedUp(data?.newUser || false),
          ),
        );
        dispatch(updateLoggedInState(true));
        dispatch(updateEmail(""));
      }
    },
  );

  return (
    <Auth3PButton
      name="google"
      title={continueWithGoogle}
      onPress={() => promptAsync()}
      disabled={!request}
      color="white"
      textColor="gray"
    />
  );
};

export default GoogleAuthButton;
