import React, { useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import client from "@src/api/client";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import useCatchAsync from "../../hooks/utilityHooks/useCatchAsync";
import appTextSource from "@src/utils/appTextSource";
import Constants from "expo-constants";
import Auth3PButton from "./Auth3PButton";
import useUpdateAuthData from "@src/hooks/authHooks/useUpdateAuthData";
import { Platform } from "react-native";
import { updateBusyState } from "../../store/auth";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

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

const GoogleAuthButton = () => {
  const { appLang } = useSelector(settingsState);
  const { continueWithGoogle } =
    appTextSource(appLang).auth.signUp;

  const web = Platform.OS === "web";

  const redirectUri = web
    ? AuthSession.makeRedirectUri({
        path: "/", // your deployed subpath
      })
    : AuthSession.makeRedirectUri({
        scheme: "com.linkoking.app",
      });

  if (web) console.log("Redirect URI (web):", redirectUri);

  const [request, response, promptAsync] =
    Google.useAuthRequest({
      clientId: GOOGLE_WEB_CLIENT_ID, // Web Client ID (for Expo Go)
      iosClientId: GOOGLE_IOS_CLIENT_ID, // iOS standalone builds
      androidClientId: GOOGLE_ANDROID_CLIENT_ID, // Android standalone builds
      redirectUri,
      responseType: "id_token", // 👈 request an ID token instead of access_token
      scopes: ["openid", "profile", "email"],
    });

  useEffect(() => {
    // First handle standard AuthSession responses (native / proxy)
    if (response?.type === "success") {
      const idToken =
        response.params?.id_token ||
        response.authentication?.idToken;
      if (idToken) loginWithGoogleToken(idToken);
      return;
    }

    // ✅ Manual fallback for web redirect (no proxy)
    if (
      Platform.OS === "web" &&
      window.location.hash.includes("id_token")
    ) {
      const params = new URLSearchParams(
        window.location.hash.substring(1)
      );
      const idToken = params.get("id_token");
      if (idToken) {
        loginWithGoogleToken(idToken);
        // Remove the token from the URL to keep it clean
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }
    }
  }, [response]);

  const catchAsync = useCatchAsync();
  const updateAuthData = useUpdateAuthData();
  const dispatch = useDispatch();

  const loginWithGoogleToken = catchAsync(
    async (idToken: string): Promise<void> => {
      try {
        dispatch(updateBusyState(true));
        if (
          GOOGLE_WEB_CLIENT_ID === "" ||
          GOOGLE_IOS_CLIENT_ID === "" ||
          GOOGLE_ANDROID_CLIENT_ID === ""
        )
          throw new Error(
            "Dev Error: Environment variables have not been set correctly"
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
          }
        );

        if (data.status === "success")
          await updateAuthData(data);
      } finally {
        dispatch(updateBusyState(false));
      }
    }
  );

  const discovery = {
    authorizationEndpoint:
      "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
    revocationEndpoint:
      "https://oauth2.googleapis.com/revoke",
  };

  const promptAsyncWithBusy = async () => {
    try {
      dispatch(updateBusyState(true));
      if (Platform.OS !== "web") promptAsync();
      else {
        const result = await request?.makeAuthUrlAsync(
          discovery
        );
        if (result) {
          // Force same-tab redirect manually
          window.location.assign(result);
        }
      }
    } finally {
      dispatch(updateBusyState(false));
    }
  };

  return (
    <Auth3PButton
      name="google"
      title={continueWithGoogle}
      onPress={promptAsyncWithBusy}
      disabled={!request}
      color="white"
      textColor="gray"
    />
  );
};

export default GoogleAuthButton;
