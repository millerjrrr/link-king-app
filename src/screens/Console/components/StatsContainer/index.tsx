import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import StatsIcon from "./StatsIcon";
import RepeatRepeatsIcon from "./RepeatRepeatsIcon";
import {
  selectConsoleState,
  updateTimerIsOn,
} from "@src/store/console";
import { convertMsToTime } from "@src/utils/convertMsToTime";
import { useEffect, useState } from "react";

const StatsContainer: React.FC<{ size?: number }> = ({
  size = 22,
}) => {
  const {
    stats,
    locals: { timerIsOn },
  } = useSelector(selectConsoleState);
  const { due, steps, time, streak, newWords } = stats;
  const dispatch = useDispatch();

  const [timeInc, setTimeInc] = useState(0);

  useEffect(() => setTimeInc(0), [time]);

  // 1. Increment time every second
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (timerIsOn) {
      intervalId = setInterval(() => {
        setTimeInc((prev) => prev + 1000);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timerIsOn, setTimeInc]);

  // 2. Timeout for Timer Reset
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const timeOutTime = 10 * 1000;

    if (timerIsOn) {
      timeoutId = setTimeout(() => {
        dispatch(updateTimerIsOn(false));
      }, timeOutTime);
    }

    return () => clearTimeout(timeoutId);
  }, [timerIsOn, steps, dispatch]);

  return (
    <View style={styles.container}>
      {due === 0 ? (
        <StatsIcon
          name="basket-fill"
          text={newWords}
          size={size}
        />
      ) : (
        <StatsIcon name="target" text={due} size={size} />
      )}
      <StatsIcon
        name="foot-print"
        text={steps}
        size={size}
      />
      <StatsIcon
        name="clock-outline"
        text={convertMsToTime(time + timeInc)}
        size={size}
      />
      <StatsIcon
        name="trophy-variant"
        text={streak}
        size={size}
      />
      {due === 0 ? (
        <RepeatRepeatsIcon
          {...{ name: "stop", size: 32 }}
        />
      ) : null}
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
