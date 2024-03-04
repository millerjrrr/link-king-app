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

const StatsContainer = ({ size = 22 }) => {
  const { stats, timeOnThisWord, timerIsOn } =
    useSelector(getConsoleState);
  const { due, steps, time, streak, newWords } = stats;

  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    const showResultsSummary = () => {
      navigation.navigate("Collection");
      navigation.navigate("StatsScreen");
    };

    if (
      (newWords === 1 && time > 3 * 60 * 1000) ||
      newWords === 20
    )
      setTimeout(showResultsSummary, 3000);
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

    if (timerIsOn) {
      timeoutId = setTimeout(() => {
        dispatch(updateTimerIsOn(false));
      }, 30 * 1000);
    } else {
      clearTimeout(timeoutId);
    }

    return () => clearTimeout(timeoutId);
  }, [timerIsOn]);

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
