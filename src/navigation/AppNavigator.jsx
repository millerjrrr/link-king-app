import {
  NavigationContainer,
  DefaultTheme,
} from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import { useSelector } from "react-redux";
import { getAuthState } from "../store/auth";
import TabNavigator from "./TabNavigator";
import colors from "../utils/colors";
import BusyWrapper from "../ui/Loader/BusyWrapper";
import ConnectedWrapper from "../errors/ConnectedWrapper";
import { getSettingsState } from "../store/settings";
import AppNavigatorUseEffects from "./AppNavigatorUseEffects";
import IsSubscribedWrapper from "../subscription/IsSubscribedWrapper";

const AppNavigator = () => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const background = colors[colorScheme].PRIMARY;
  const primary = colors[colorScheme].CONTRAST[golden];

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
      <BusyWrapper
        {...{
          busy,
          size: 96,
          backgroundColor: background,
        }}
      >
        <ConnectedWrapper>
          <IsSubscribedWrapper>
            {loggedIn ? (
              <TabNavigator />
            ) : (
              <AuthNavigator />
            )}
          </IsSubscribedWrapper>
        </ConnectedWrapper>
      </BusyWrapper>
    </NavigationContainer>
  );
};

export default AppNavigator;
