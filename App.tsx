import "react-native-reanimated";
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
import { Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  useRequestPermissions();
  useSendPushToken();

  const Wrapper =
    Platform.OS === "android" ? SafeAreaView : View;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <AdaptiveAppContainer>
          <Wrapper style={{ flex: 1 }} edges={["bottom"]}>
            <AppNotification />
            <AppModals />
            <AppLoadingContainer>
              <RootNavigator />
            </AppLoadingContainer>
          </Wrapper>
        </AdaptiveAppContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}
