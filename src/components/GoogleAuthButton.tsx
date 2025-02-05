import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import {
  Image,
  TouchableOpacity,
  View,
} from "react-native";
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
import useCatchAsync from "./../hooks/useCatchAsync";
import useColors from "@src/hooks/useColors";
import appShadow from "@src/utils/appShadow";
import AppText from "./AppText";
import appTextSource from "@src/utils/appTextSource";

import Constants from "expo-constants";

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

  const { SECONDARY, CONTRAST } = useColors();

  const { continueWithGoogle } =
    appTextSource(appLang).auth.signUp;

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: SECONDARY,
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 100,
          ...appShadow(CONTRAST),
        }}
        disabled={!request}
        onPress={() => promptAsync()}
        activeOpacity={0.8}
      >
        <Image
          source={require("@assets/img/google-icon.png")}
          style={{
            width: 24,
            height: 24,
            marginRight: 10,
          }}
        />

        <AppText
          style={{ fontSize: 16, fontWeight: "bold" }}
        >
          {continueWithGoogle}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleAuthButton;
