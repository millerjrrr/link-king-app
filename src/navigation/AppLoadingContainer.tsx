import {
  NavigationContainer,
  DefaultTheme,
} from "@react-navigation/native";
import ConnectedWrapper from "@src/components/ConnectedWrapper";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import AppLoadingWrapper from "@src/components/Loader/AppLoadingWrapper";
import useColors from "@src/hooks/utilityHooks/useColors";
import VideoSplashScreenWrapper from "@src/screens/VideoSplashScreen";
import useStartUpHooks from "@src/hooks/useStartUpHooks";
import { ReactNode } from "react";

const AppLoadingContainer: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { STATUSBAR, PRIMARY, CONTRAST } = useColors();

  const AppTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: PRIMARY,
      primary: CONTRAST,
    },
  };

  useStartUpHooks();

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
              {children}
            </AppLoadingWrapper>
          </VideoSplashScreenWrapper>
        </View>
      </ConnectedWrapper>
    </NavigationContainer>
  );
};

export default AppLoadingContainer;
