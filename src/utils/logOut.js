import { StatusBar } from "react-native";
import {
  updateLoggedInState,
  updateToken,
} from "../store/auth";
import { updateSettings } from "../store/settings";
import { removeFromAsyncStorage } from "./asyncStorage";
import colors from "./colors";

const logOut = async (dispatch) => {
  dispatch(updateToken(""));
  dispatch(updateLoggedInState(false));
  dispatch(updateSettings({ colorScheme: "dark" }));
  removeFromAsyncStorage("auth-token");
  removeFromAsyncStorage("color-scheme");
  StatusBar.setBarStyle(colors.dark.STATUSBAR);
};

export default logOut;
