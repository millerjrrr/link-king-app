import { StatusBar } from "react-native";
import {
  updateLoggedInState,
  updateToken,
} from "@src/store/auth";
import { updateSettings } from "@src/store/settings";
import { useDispatch } from "react-redux";
import { removeFromAsyncStorage } from "@src/utils/asyncStorage";
import { updateModals } from "@src/store/modals";

const useLogOut = () => {
  const dispatch = useDispatch();

  const logOut = async () => {
    dispatch(updateModals({ modalShowing: "" }));
    dispatch(updateToken(""));
    dispatch(updateLoggedInState(false));
    dispatch(
      updateSettings({ colorScheme: "dark", golden: 0 }),
    );
    StatusBar.setBarStyle("light-content");
    removeFromAsyncStorage("auth-token");
    removeFromAsyncStorage("color-scheme");
  };
  return logOut;
};

export default useLogOut;
