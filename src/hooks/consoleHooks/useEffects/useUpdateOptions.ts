import { useCallback, useEffect, useState } from "react";
import { AppState } from "react-native";
import useCheckTTSData from "../useCheckTTSData";
import { useDispatch } from "react-redux";
import { updateOptions } from "@src/store/console";

const useUpdateOptions = () => {
  const [appState, setAppState] = useState(
    AppState.currentState,
  );

  const checkTTSData = useCheckTTSData();
  const dispatch = useDispatch();

  const checkTTSAndUpdateOptions = useCallback(async () => {
    const TTS = await checkTTSData();
    if (!TTS) {
      dispatch(
        updateOptions({
          sound: false,
          blurred: false,
        }),
      );
    }
  }, [checkTTSData]);

  // need to update on appStateChange because
  // sometimes a user might delete a TTS pack
  // and then sound should be off
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (
          appState.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          console.log("appState change");
          checkTTSAndUpdateOptions();
        }
        setAppState(nextAppState);
      },
    );

    return () => {
      subscription.remove();
    };
  }, [appState]);

  // options should update every time language changes

  useEffect(() => {
    console.log("# language change");
    checkTTSAndUpdateOptions();
  }, [checkTTSAndUpdateOptions]);
};

export default useUpdateOptions;
