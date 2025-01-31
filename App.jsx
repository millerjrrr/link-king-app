import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import RootNavigator from "./src/navigation/RootNavigator";
import AppNotification from "./src/components/AppNotification";
import AppModals from "./src/components/AppModals";
import AdaptiveAppContainer from "./src/components/Graphics/AdaptiveAppContainer";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    const prepare = async () => {
      await new Promise((resolve) =>
        setTimeout(resolve, 2000),
      );
      await SplashScreen.hideAsync();
    };

    prepare();
  }, []);

  return (
    <Provider store={store}>
      <AdaptiveAppContainer>
        <AppNotification />
        <AppModals />
        <RootNavigator />
      </AdaptiveAppContainer>
    </Provider>
  );
}
