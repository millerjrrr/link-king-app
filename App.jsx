import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";
import store from "./src/store";
import AppNavigator from "./src/navigation/AppNavigator";
import AppContainer from "./src/components/AppContainer";

export default function App() {
  useEffect(() => {
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
