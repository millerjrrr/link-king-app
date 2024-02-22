import { Text, View, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { convertMsToTime } from "./functions/convertMsToTime";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import StatsIcon from "./StatsIcon";

const StatsContainer = () => {
  const { stats, timeOnThisWord, golden } =
    useSelector(getConsoleState);
  const { due, steps, time, streak, newWords } = stats;

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
