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
import colors from "@src/utils/colors";
import ConnectedWrapper from "@src/errors/ConnectedWrapper";
import { settingsState } from "@src/store/settings";
import { StatusBar } from "expo-status-bar";
import useFetchSettings from "../hooks/authHooks/useFetchSettings";
import { useEffect } from "react";
import { View } from "react-native";
import AppLoadingWrapper from "@src/components/Loader/AppLoadingWrapper";
import useCheckSubscriptionStatusAndFetchAuthInfo from "./../hooks/subscriptionHooks/useCheckSubscriptionStatus";

const RootNavigator = () => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const { appLoading } = useSelector(authState);
  const primary = colors[colorScheme].CONTRAST[golden];
  const { STATUSBAR, PRIMARY: background } =
    colors[colorScheme];

  const AppTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background,
      primary,
    },
  };

  const { loggedIn, refresh } = useSelector(authState);
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

  return (
    <NavigationContainer theme={AppTheme}>
      <StatusBar
        style={STATUSBAR}
        translucent={true}
        backgroundColor="#00000000"
      />
      <ConnectedWrapper>
        <View
          style={{ flex: 1, backgroundColor: background }}
        >
          <AppLoadingWrapper>
            {loggedIn ? (
              <TabNavigator />
            ) : (
              <AuthNavigator />
            )}
          </AppLoadingWrapper>
        </View>
      </ConnectedWrapper>
    </NavigationContainer>
  );
};

export default RootNavigator;
