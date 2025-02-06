import React, { useEffect } from "react";
import * as AppleAuthentication from "expo-apple-authentication";
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
import AppleAuthGraphic from "./AppleAuthGraphic";
import appTextSource from "@src/utils/appTextSource";

const AppleAuthButton = () => {
  const dispatch = useDispatch();
  const { appLang } = useSelector(settingsState);
  appTextSource(appLang).auth.signUp;

  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(
      (available) => {
        if (!available) {
          console.warn(
            "Apple Sign-In is not available on this device.",
          );
        }
      },
    );
  }, []);

  const catchAsync = useCatchAsync();

  const signInWithApple = catchAsync(async () => {
    const credential =
      await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope
            .FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope
            .EMAIL,
        ],
      });

    if (credential.identityToken) {
      await loginWithAppleToken(
        credential.identityToken,
        credential.fullName?.givenName || "",
      );
    }
  });

  const loginWithAppleToken = catchAsync(
    async (
      idToken: string,
      name: string,
    ): Promise<void> => {
      console.log(name);
      const { data } = await client.post(
        "/api/v1/users/sign-in-with-apple",
        {
          idToken,
          name,
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
          updateJustSignedUp(data?.newUser || false),
        );
        dispatch(updateLoggedInState(true));
        dispatch(updateEmail(""));
      }
    },
  );

  return (
    <AppleAuthGraphic onPress={() => signInWithApple()} />
  );
};

export default AppleAuthButton;
