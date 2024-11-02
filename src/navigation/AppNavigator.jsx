import {
  NavigationContainer,
  DefaultTheme,
} from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import { useSelector } from "react-redux";
import { getAuthState } from "@src/store/auth";
import TabNavigator from "./TabNavigator";
import colors from "@src/utils/colors";
import BusyWrapper from "../components/Loader/BusyWrapper";
import ConnectedWrapper from "@src/errors/ConnectedWrapper";
import { getSettingsState } from "@src/store/settings";
import AppNavigatorUseEffects from "./AppNavigatorUseEffects";
import { StatusBar } from "expo-status-bar";

const AppNavigator = () => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const background = colors[colorScheme].PRIMARY;
  const primary = colors[colorScheme].CONTRAST[golden];
  const { STATUSBAR } = colors[colorScheme];

  const AppTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background,
      primary,
    },
  };
  const { loggedIn, busy } = useSelector(getAuthState);

  return (
    <NavigationContainer theme={AppTheme}>
      <AppNavigatorUseEffects />
      <StatusBar
        style={STATUSBAR}
        translucent={true}
        backgroundColor="#00000000"
      />
      {/* important for production build */}
      <BusyWrapper
        {...{
          busy,
          size: 96,
          backgroundColor: background,
        }}
      >
        <ConnectedWrapper>
          {loggedIn ? <TabNavigator /> : <AuthNavigator />}
        </ConnectedWrapper>
      </BusyWrapper>
    </NavigationContainer>
  );
};

export default AppNavigator;
