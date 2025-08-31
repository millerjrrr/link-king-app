import { Provider } from "react-redux";
import store from "./src/store";
import RootNavigator from "./src/navigation/RootNavigator";
import AppNotification from "./src/components/AppNotification";
import AppModals from "./src/components/AppModals";
import AdaptiveAppContainer from "./src/components/Containers/AdaptiveAppContainer";
import AppLoadingContainer from "./src/navigation/AppLoadingContainer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useRequestPermissions from "./src/hooks/utilityHooks/useRequestPermissions";
import useSendPushToken from "./src/hooks/utilityHooks/useSendPushToken";

export default function App() {
  useRequestPermissions();
  useSendPushToken();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <AdaptiveAppContainer>
          <AppNotification />
          <AppModals />
          <AppLoadingContainer>
            <RootNavigator />
          </AppLoadingContainer>
        </AdaptiveAppContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}
