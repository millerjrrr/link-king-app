import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { AppState } from "react-native";
import { selectConsoleState } from "@src/store/console";
import useSendOptions from "../useSendOptions";
import useCheckTTSData from "../useCheckTTSData";

const useUpdateOptions = () => {
  const [appState, setAppState] = useState(
    AppState.currentState,
  );

  const checkTTSData = useCheckTTSData();
  const sendOptions = useSendOptions();

  const updateOptions = useCallback(async () => {
    const TTS = await checkTTSData();
    if (!TTS) {
      await sendOptions({ sound: false, blurred: false });
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
          updateOptions();
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
    updateOptions();
  }, [updateOptions]);
};

export default useUpdateOptions;
