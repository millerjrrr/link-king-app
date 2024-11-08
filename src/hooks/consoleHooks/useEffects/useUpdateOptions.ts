import { useSelector } from "react-redux";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppState } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { selectConsoleState } from "@src/store/console";
import useSendOptions from "../useSendOptions";
import useCheckTTSData from "../useCheckTTSData";

const useUpdateOptions = () => {
  const [appState, setAppState] = useState(
    AppState.currentState,
  );
  const hasRunOnMount = useRef(false);

  const {
    gamePlay: { speechLang: language },
  } = useSelector(selectConsoleState);

  const checkTTSData = useCheckTTSData();
  const sendOptions = useSendOptions();
  const updateOptions = async () => {
    const TTS = await checkTTSData();
    if (!TTS)
      await sendOptions({ sound: false, blurred: false });
  };

  // fetchConsoleInfo on appStartUp
  useEffect(() => {
    if (!hasRunOnMount.current) {
      updateOptions();
      hasRunOnMount.current = true; // Set flag after initial run
    }
  }, [language]);

  // fetchConsoleInfo when app enters foreground
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (
          appState.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          updateOptions();
        }
        setAppState(nextAppState);
      },
    );

    return () => {
      subscription.remove();
    };
  }, [appState, language]);

  useFocusEffect(
    useCallback(() => {
      if (hasRunOnMount.current) {
        updateOptions();
      }
    }, [language]),
  );
};

export default useUpdateOptions;
