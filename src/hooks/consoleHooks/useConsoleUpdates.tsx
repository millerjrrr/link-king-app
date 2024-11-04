import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { AppState } from "react-native";
import { fetchConsoleInfo } from "@src/utils/fetchConsoleInfo";

const useConsoleUpdates = () => {
  const dispatch = useDispatch();
  const [appState, setAppState] = useState(
    AppState.currentState,
  );

  // fetchConsoleInfo on appStartUp
  useEffect(() => {
    fetchConsoleInfo({ dispatch });
  }, [dispatch]);

  //fetchConsoleInfo when app enters foreground
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (
          appState.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          fetchConsoleInfo({ dispatch });
        }
        setAppState(nextAppState);
      },
    );

    return () => {
      subscription.remove();
    };
  }, [appState, dispatch]);
};

export default useConsoleUpdates;
