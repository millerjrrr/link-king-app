import AppText from "@src/components/AppText";
import AnnouncementContainer from "@src/components/Containers/AnnouncementContainer";
import AuthFormContainer from "@src/components/Containers/AuthFormContainer";
import useColors from "@src/hooks/utilityHooks/useColors";
import appShadow from "@src/utils/appShadow";
import React from "react";
import {
  Image,
  Linking,
  TouchableOpacity,
  Platform,
} from "react-native";
declare function require(path: string): any;
import { authState } from "@src/store/auth";
import { useSelector } from "react-redux";
import appTextSource from "@src/utils/appTextSource";
import { settingsState } from "@src/store/settings";
import Constants from "expo-constants";

const UpdateToLatestVersionPage = () => {
  // Links to your app on the App Store and Play Store
  const appStoreLink =
    "https://apps.apple.com/app/link-king/id6496679226";
  const playStoreLink =
    "https://play.google.com/store/apps/details?id=com.linkoking.app";
  const { appLang } = useSelector(settingsState);

  const { heading, subHeading, linkX, currentX } =
    appTextSource(appLang).updates;

  const currentVersion =
    Constants.expoConfig?.version || "5.0.3";
  const current = currentX.replace("#X", currentVersion);

  const { latestVersion } = useSelector(authState);
  const link = linkX.replace("#X", latestVersion);

  const onPress = () =>
    Linking.openURL(
      Platform.OS === "ios" ? appStoreLink : playStoreLink,
    );

  const source = require("@assets/adaptive-icon.png");

  const { CONTRAST, INACTIVE_CONTRAST } = useColors();

  return (
    <AnnouncementContainer>
      <AuthFormContainer
        heading={heading}
        subHeading={subHeading}
        back={false}
        noScrollView
      >
        <TouchableOpacity
          onPress={onPress}
          style={{
            padding: 20,
            marginTop: 30,
            marginBottom: 20,
            backgroundColor: "#000000",
            borderRadius: 30,
            ...appShadow(CONTRAST, 10),
          }}
        >
          <Image
            source={source}
            style={{ height: 150, width: 150 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <AppText onPress={onPress}>{link}</AppText>
        <AppText
          style={{
            color: INACTIVE_CONTRAST,
            fontSize: 15,
            marginTop: 10,
          }}
        >
          {current}
        </AppText>
      </AuthFormContainer>
    </AnnouncementContainer>
  );
};

export default UpdateToLatestVersionPage;
