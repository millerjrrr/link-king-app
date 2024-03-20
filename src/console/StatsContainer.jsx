import { View, StyleSheet } from "react-native";
import { convertMsToTime } from "./functions/convertMsToTime";
import { useDispatch, useSelector } from "react-redux";
import {
  getConsoleState,
  incrementTimeOnThisWord,
  updateTimerIsOn,
} from "../store/console";
import StatsIcon from "./StatsIcon";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  getSettingsState,
  updateSettings,
} from "../store/settings";

const StatsContainer = ({ size = 22 }) => {
  const { stats, timeOnThisWord, timerIsOn } =
    useSelector(getConsoleState);
  const { due, steps, time, streak, newWords } = stats;
  const { timeGoal, newWordsGoal, stepsGoal, golden } =
    useSelector(getSettingsState);

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
  }, [newWords, timerIsOn]);

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

    if (timerIsOn) {
      timeoutId = setTimeout(() => {
        dispatch(updateTimerIsOn(false));
      }, 30 * 1000);
    } else {
      clearTimeout(timeoutId);
    }

    return () => clearTimeout(timeoutId);
  }, [timerIsOn, steps]);

  return (
    <View style={styles.container}>
      {newWords ? (
        <StatsIcon
          {...{ name: "basket-fill", text: newWords, size }}
        />
      ) : (
        <StatsIcon
          {...{ name: "target", text: due, size }}
        />
      )}
      <StatsIcon
        {...{ name: "foot-print", text: steps, size }}
      />
      <StatsIcon
        {...{
          name: "clock-outline",
          text: convertMsToTime(time + timeOnThisWord),
          size,
        }}
      />
      <StatsIcon
        {...{ name: "trophy-variant", text: streak, size }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 5,
    paddingVertical: 3,
    zIndex: 10,
  },
});

export default StatsContainer;
