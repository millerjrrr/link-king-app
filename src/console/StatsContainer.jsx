import { Text, View, StyleSheet } from "react-native";
import colors from "../utils/colors";
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

const StatsContainer = () => {
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
        <StatsIcon iconName="basket-fill" text={newWords} />
      ) : (
        <StatsIcon iconName="target" text={due} />
      )}
      <StatsIcon iconName="foot-print" text={steps} />
      <StatsIcon
        iconName="clock-outline"
        text={convertMsToTime(time + timeOnThisWord)}
      />
      <StatsIcon iconName="trophy-variant" text={streak} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});

export default StatsContainer;
