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
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const StatsContainer: React.FC<{ size?: number }> = ({
  size = base * 22,
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
    if (!timerIsOn) return;

    const intervalId = setInterval(() => {
      setTimeInc((prev) => prev + 1000);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timerIsOn, setTimeInc]);

  // 2. Timeout for Timer Reset
  useEffect(() => {
    const timeOutTime = 10 * 1000;
    if (!timerIsOn) return;

    const timeoutId = setTimeout(() => {
      dispatch(updateTimerIsOn(false));
    }, timeOutTime);

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
        <RepeatRepeatsIcon name="stop" size={base * 32} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: base * 5,
    paddingVertical: base * 3,
    zIndex: 10,
  },
});

export default StatsContainer;
