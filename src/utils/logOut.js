import {
  updateLoggedInState,
  updateToken,
} from "../store/auth";
import { removeFromAsyncStorage } from "./asyncStorage";

const logOut = async (dispatch) => {
  dispatch(updateToken(""));
  dispatch(updateLoggedInState(false));
  dispatch(updateSettings({ colorScheme: "dark" }));
  removeFromAsyncStorage("auth-token");
  removeFromAsyncStorage("color-scheme");
};

export default logOut;
