import { useDispatch, useSelector } from "react-redux";
import {
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
import { AppState } from "react-native";
import { fetchConsoleInfo } from "./functions/fetchConsoleInfo";

const UseEffects = () => {
  const { stats, timerIsOn, showSolution } =
    useSelector(getConsoleState);
  const { timeGoal, newWordsGoal, stepsGoal, golden } =
    useSelector(getSettingsState);
  const { steps, time, newWords } = stats;

  const dispatch = useDispatch();

  const navigation = useNavigation();

  //goal management
  useEffect(() => {
    const showResultsSummary = () => {
      navigation.navigate("Collection");
      navigation.navigate("StatsScreen");
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
  }, [newWords]);

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
          console.log("App has come to the foreground!");
          fetchConsoleInfo({ dispatch });
        }
        setAppState(nextAppState);
      },
    );

    return () => {
      subscription.remove();
    };
  }, [appState]);
};

export default UseEffects;
