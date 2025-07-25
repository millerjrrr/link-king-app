import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import StatsIcon from "./StatsIcon";
import RepeatRepeatsIcon from "./RepeatRepeatsIcon";
import { selectConsoleState } from "@src/store/console";
import { convertMsToTime } from "@src/utils/convertMsToTime";

const StatsContainer: React.FC<{ size?: number }> = ({
  size = 22,
}) => {
  const {
    stats,
    locals: { timeOnThisWord },
  } = useSelector(selectConsoleState);
  const { due, steps, time, streak, newWords } = stats;

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
        text={convertMsToTime(time + timeOnThisWord)}
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
