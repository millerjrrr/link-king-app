import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
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
import { saveToAsyncStorage } from "@src/utils/asyncStorage";
import {
  updateEmail,
  updateJustSignedUp,
  updateLoggedInState,
  updateToken,
} from "@src/store/auth";
import useCatchAsync from "./../hooks/useCatchAsync";
import {
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
} from "@env";

declare function require(path: string): any;

WebBrowser.maybeCompleteAuthSession();

const GoogleAuthButton = () => {
  const dispatch = useDispatch();

  const { appLang } = useSelector(settingsState);

  const [request, response, promptAsync] =
    Google.useAuthRequest({
      clientId: GOOGLE_WEB_CLIENT_ID, // Web Client ID (for Expo Go)
      iosClientId: GOOGLE_IOS_CLIENT_ID, // iOS standalone builds
      androidClientId: GOOGLE_ANDROID_CLIENT_ID, // Android standalone builds
      redirectUri: makeRedirectUri({
        scheme: "com.linkoking.app",
      }),
    });

  useEffect(() => {
    if (
      response?.type === "success" &&
      response.authentication?.idToken
    ) {
      loginWithGoogleToken(response.authentication.idToken);
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
        await saveToAsyncStorage("auth-token", data.token);
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
          marginTop: 10,
        }}
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <Image
          source={require("@assets/img/GSignUp.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default GoogleAuthButton;
