import { useDispatch, useSelector } from "react-redux";
import {
  backOut,
  getConsoleState,
  incrementTimeOnThisWord,
  updateTimerIsOn,
} from "../store/console";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  getSettingsState,
  updateSettings,
} from "../store/settings";
import { AppState, Keyboard } from "react-native";
import { fetchConsoleInfo } from "./functions/fetchConsoleInfo";
import { returnWrongAnswerToServer } from "./functions/returnWrongAnswerToServer";

const UseEffects = () => {
  const {
    stats,
    timerIsOn,
    showSolution,
    startedThisWord,
    isPlaying,
  } = useSelector(getConsoleState);
  const { timeGoal, newWordsGoal, stepsGoal, golden } =
    useSelector(getSettingsState);
  const { steps, time, newWords } = stats;

  const dispatch = useDispatch();

  const navigation = useNavigation();

  //goal management
  useEffect(() => {
    if (showSolution) {
      const showResultsSummary = () => {
        navigation.navigate("ProgressScreen");
      };

      const timeGoalMet =
        timeGoal !== "" && time >= timeGoal * 60 * 1000;
      const newWordsGoalMet =
        newWordsGoal !== "" && newWords >= newWordsGoal;
      const stepsGoalMet =
        stepsGoal !== "" && steps >= stepsGoal;

      if (timeGoalMet || newWordsGoalMet || stepsGoalMet) {
        if (golden === 0) {
          setTimeout(showResultsSummary, 1500);
          dispatch(updateSettings({ golden: 1 }));
        }
      } else dispatch(updateSettings({ golden: 0 }));
    }
  }, [showSolution]);

  useEffect(() => {
    let intervalId;
    if (timerIsOn) {
      intervalId = setInterval(() => {
        dispatch(incrementTimeOnThisWord(1000));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timerIsOn]);

  useEffect(() => {
    let timeoutId;
    const timeOutTime = showSolution
      ? 10 * 1000
      : 30 * 1000;
    if (timerIsOn) {
      timeoutId = setTimeout(() => {
        dispatch(updateTimerIsOn(false));
      }, timeOutTime);
    } else {
      clearTimeout(timeoutId);
    }

    return () => clearTimeout(timeoutId);
  }, [timerIsOn, steps, showSolution]);

  const [appState, setAppState] = useState(
    AppState.currentState,
  );

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
  }, [appState]);

  const closeKeyboard = () => {
    if (!showSolution && isPlaying) {
      returnWrongAnswerToServer({
        dispatch,
        startedThisWord,
        showSolution,
      });
    } else {
      dispatch(backOut());
    }
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "background") {
        closeKeyboard();
      }
    };
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [showSolution, isPlaying]);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      closeKeyboard,
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, [showSolution, isPlaying]);
};

export default UseEffects;
