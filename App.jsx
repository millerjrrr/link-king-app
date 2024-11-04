import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import RootNavigator from "./src/navigation/RootNavigator";
import AppNotification from "./src/components/AppNotification";

export default function App() {
  return (
    <Provider store={store}>
      <AppNotification />
      <RootNavigator />
    </Provider>
  );
}
