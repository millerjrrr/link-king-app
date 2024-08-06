import { View, StyleSheet } from "react-native";
import { convertMsToTime } from "./functions/convertMsToTime";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import StatsIcon from "./StatsIcon";

const StatsContainer = ({ size = 22 }) => {
  const { stats, timeOnThisWord } =
    useSelector(getConsoleState);
  const { due, steps, time, streak, newWords } = stats;

  return (
    <View style={styles.container}>
      {due === 0 ? (
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
