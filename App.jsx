import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { StatusBar, Platform } from "react-native";
import store from "./src/store";
import AppNavigator from "./src/navigation/AppNavigator";
import SafeAreaAndroid from "./src/utils/SafeAreaAndroid";
import colors from "./src/utils/colors";

export default function App() {
  useEffect(() => {
    // if (Platform.OS === "android") {
    //   StatusBar.setBackgroundColor(
    //     colors.INACTIVE_CONTRAST,
    //   );
    // }
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
