import { StatusBar } from "react-native";
import { useDispatch } from "react-redux";
import {
  clearAsyncStorage,
  secureRemoveFromAsyncStorage,
} from "@src/utils/asyncStorage";
import { resetStore } from "@src/store";
import { updateAppLoadingState } from "@src/store/auth";

const useLogOut = () => {
  const dispatch = useDispatch();

  const logOut = async () => {
    dispatch(resetStore());
    StatusBar.setBarStyle("light-content");
    secureRemoveFromAsyncStorage("auth-token");
    clearAsyncStorage();
    dispatch(updateAppLoadingState(false));
  };
  return logOut;
};

export default useLogOut;
