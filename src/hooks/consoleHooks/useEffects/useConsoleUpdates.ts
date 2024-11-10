import { useDispatch } from "react-redux";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppState } from "react-native";
import useFetchConsoleInfo from "@src/hooks/consoleHooks/useFetchConsoleInfo";
import { useFocusEffect } from "@react-navigation/native";

const useConsoleUpdates = () => {
  const dispatch = useDispatch();
  const fetchConsoleInfo = useFetchConsoleInfo();
  const [appState, setAppState] = useState(
    AppState.currentState,
  );

  // fetchConsoleInfo on appStartUp

  // important to refresh console on navigation after say
  // deleting a ticket

  useFocusEffect(
    useCallback(() => {
      fetchConsoleInfo();
    }, [dispatch]),
  );

  //fetchConsoleInfo when app enters foreground
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (
          appState.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          fetchConsoleInfo();
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
