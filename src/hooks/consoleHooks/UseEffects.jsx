import { useDispatch, useSelector } from "react-redux";
import {
  backOut,
  getConsoleState,
  incrementTimeOnThisWord,
  updateTimerIsOn,
} from "@src/store/console";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  getSettingsState,
  updateSettings,
} from "@src/store/settings";
import { AppState, Keyboard } from "react-native";
import { fetchConsoleInfo } from "@src/utils/fetchConsoleInfo";
import { returnWrongAnswerToServer } from "@src/utils/returnWrongAnswerToServer";
import { getAuthState } from "@src/store/auth";
import { errorHandler } from "@src/errors/errorHandler";
import {
  getFromAsyncStorage,
  saveToAsyncStorage,
} from "@src/utils/asyncStorage";

const UseEffects = ({
  setIsModalVisible,
  setIsModalVisible2,
}) => {
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

  const { subscribed, trialDays, vip, refresh } =
    useSelector(getAuthState);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  //goal management
  useEffect(() => {
    if (showSolution) {
      const showResultsSummary = () => {
        navigation.navigate("ProgressScreen");
      };

      const timeGoalMet =
        timeGoal !== 0 && time >= timeGoal * 60 * 1000;
      const newWordsGoalMet =
        newWordsGoal !== 0 && newWords >= newWordsGoal;
      const stepsGoalMet =
        stepsGoal !== 0 && steps >= stepsGoal;

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

  const showWelcome = async () => {
    try {
      const firstTime =
        (await getFromAsyncStorage("first-time")) || "yes";

      if (firstTime !== "no") {
        setIsModalVisible(true);
        await saveToAsyncStorage("first-time", "no");
      } else if (
        !(vip > Date.now()) &&
        !subscribed &&
        trialDays >= 0 &&
        steps <= 5
      )
        setIsModalVisible2(true);
    } catch (error) {
      errorHandler(error, dispatch);
    }
  };

  const fetchInfoAndShowWelcome = () => {
    fetchConsoleInfo({ dispatch });
    showWelcome();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      fetchInfoAndShowWelcome,
    );

    fetchInfoAndShowWelcome();
    return unsubscribe;
  }, [navigation, refresh]);
};

export default UseEffects;
