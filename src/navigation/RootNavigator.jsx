import {
  NavigationContainer,
  DefaultTheme,
} from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import { useDispatch, useSelector } from "react-redux";
import {
  authState,
  updateBusyState,
} from "@src/store/auth";
import TabNavigator from "./TabNavigator";
import colors from "@src/utils/colors";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import ConnectedWrapper from "@src/errors/ConnectedWrapper";
import { settingsState } from "@src/store/settings";
import { StatusBar } from "expo-status-bar";
import useFetchAuthInfo from "../hooks/authHooks/useFetchAuthInfo";
import useFetchSettings from "../hooks/authHooks/useFetchSettings";
import { useEffect, useState } from "react";
import { AppState } from "react-native";

const RootNavigator = () => {
  const { colorScheme, golden } =
    useSelector(settingsState);
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

  const { loggedIn, busy, refresh } =
    useSelector(authState);
  const [appState] = useState(AppState.currentState);

  const fetchAuthInfo = useFetchAuthInfo();
  const fetchSettings = useFetchSettings();
  const dispatch = useDispatch();

  useEffect(() => {
    const update = async () => {
      dispatch(updateBusyState(true));
      await fetchAuthInfo();
      await fetchSettings();
      dispatch(updateBusyState(false));
    };

    update();
  }, [refresh, appState]);

  return (
    <NavigationContainer theme={AppTheme}>
      <StatusBar
        style={STATUSBAR}
        translucent={true}
        backgroundColor="#00000000"
      />
      <BusyWrapper
        busy={busy}
        size={150}
        backgroundColor={background}
      >
        <ConnectedWrapper>
          {loggedIn ? <TabNavigator /> : <AuthNavigator />}
        </ConnectedWrapper>
      </BusyWrapper>
    </NavigationContainer>
  );
};

export default RootNavigator;
