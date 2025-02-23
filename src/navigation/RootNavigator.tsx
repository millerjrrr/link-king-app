import {
  NavigationContainer,
  DefaultTheme,
} from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import { useDispatch, useSelector } from "react-redux";
import {
  authState,
  updateAppLoadingState,
} from "@src/store/auth";
import TabNavigator from "./TabNavigator";
import ConnectedWrapper from "@src/components/ConnectedWrapper";
import { StatusBar } from "expo-status-bar";
import useFetchSettings from "../hooks/authHooks/useFetchSettings";
import { useEffect } from "react";
import { View } from "react-native";
import AppLoadingWrapper from "@src/components/Loader/AppLoadingWrapper";
import useCheckSubscriptionStatusAndFetchAuthInfo from "../hooks/subscriptionHooks/useCheckSubscriptionStatus";
import useColors from "@src/hooks/useColors";
import WalkthroughNavigator from "./WalkthroughNavigator";
import UpdateToLatestVersionPage from "@src/screens/popUpScreens/UpdateToLatestVersionPage";
import Constants from "expo-constants";
import compareVersions from "@src/utils/versionCompare";
import VideoSplashScreenWrapper from "@src/screens/VideoSplashScreen";
import usePlayBackgroundMusic from "@src/hooks/usePlayBackgroundMusic";

const RootNavigator = () => {
  const { STATUSBAR, PRIMARY, CONTRAST } = useColors();

  const AppTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: PRIMARY,
      primary: CONTRAST,
    },
  };

  const currentVersion =
    Constants.expoConfig?.version || "5.0.3";

  const { loggedIn, refresh, justSignedUp, latestVersion } =
    useSelector(authState);

  const updateRequired = compareVersions(
    latestVersion,
    currentVersion,
  );

  const checkSubscriptionStatusAndFetchAuthInfo =
    useCheckSubscriptionStatusAndFetchAuthInfo();
  const fetchSettings = useFetchSettings();
  const dispatch = useDispatch();

  useEffect(() => {
    const update = async () => {
      dispatch(updateAppLoadingState(true));
      await checkSubscriptionStatusAndFetchAuthInfo();
      await fetchSettings();
      setTimeout(
        () => dispatch(updateAppLoadingState(false)),
        1000,
      );
    };

    update();
  }, [refresh]);

  usePlayBackgroundMusic();

  return (
    <NavigationContainer theme={AppTheme}>
      <StatusBar
        style={STATUSBAR}
        translucent
        backgroundColor="#00000000"
      />
      <ConnectedWrapper>
        <View style={{ flex: 1, backgroundColor: PRIMARY }}>
          <VideoSplashScreenWrapper>
            <AppLoadingWrapper>
              {updateRequired ? (
                <UpdateToLatestVersionPage />
              ) : loggedIn ? (
                justSignedUp ? (
                  <WalkthroughNavigator />
                ) : (
                  <TabNavigator />
                )
              ) : (
                <AuthNavigator />
              )}
            </AppLoadingWrapper>
          </VideoSplashScreenWrapper>
        </View>
      </ConnectedWrapper>
    </NavigationContainer>
  );
};

export default RootNavigator;
