import { useDispatch } from "react-redux";
import { backOut } from "@src/store/console";
import { useEffect } from "react";
import { AppState } from "react-native";

const useHandleAppBackgroundExit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (nextAppState === "background") {
          dispatch(backOut());
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, [dispatch]);
};

export default useHandleAppBackgroundExit;
