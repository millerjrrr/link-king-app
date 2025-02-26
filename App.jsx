import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import RootNavigator from "./src/navigation/RootNavigator";
import AppNotification from "./src/components/AppNotification";
import AppModals from "./src/components/AppModals";
import AdaptiveAppContainer from "./src/components/Graphics/AdaptiveAppContainer";
import AppLoadingContainer from "./src/navigation/AppLoadingContainer";

export default function App() {
  return (
    <Provider store={store}>
      <AdaptiveAppContainer>
        <AppNotification />
        <AppModals />
        <AppLoadingContainer>
          <RootNavigator />
        </AppLoadingContainer>
      </AdaptiveAppContainer>
    </Provider>
  );
}
