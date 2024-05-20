import { StatusBar } from "react-native";
import {
  updateLoggedInState,
  updateToken,
} from "../store/auth";
import { updateSettings } from "../store/settings";
import { removeFromAsyncStorage } from "./asyncStorage";

const logOut = async (dispatch) => {
  dispatch(updateToken(""));
  dispatch(updateLoggedInState(false));
  dispatch(
    updateSettings({ colorScheme: "dark", golden: 0 }),
  );
  StatusBar.setBarStyle("light-content");
  removeFromAsyncStorage("auth-token");
  removeFromAsyncStorage("color-scheme");
};

export default logOut;
