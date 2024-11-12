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
import useFetchAuthInfo from "../hooks/authHooks/useFetchAuthInfo";
import useFetchSettings from "../hooks/authHooks/useFetchSettings";
import { useEffect } from "react";
import { View } from "react-native";
import BusyWrapper from "@src/components/Loader/BusyWrapper";

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

  const fetchAuthInfo = useFetchAuthInfo();
  const fetchSettings = useFetchSettings();
  const dispatch = useDispatch();

  useEffect(() => {
    const update = async () => {
      dispatch(updateAppLoadingState(true));
      await fetchAuthInfo();
      await fetchSettings();
      dispatch(updateAppLoadingState(false));
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
          <BusyWrapper busy={appLoading} size={150}>
            {loggedIn ? (
              <TabNavigator />
            ) : (
              <AuthNavigator />
            )}
          </BusyWrapper>
        </View>
      </ConnectedWrapper>
    </NavigationContainer>
  );
};

export default RootNavigator;
