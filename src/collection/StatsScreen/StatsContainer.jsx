import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getStatsState } from "../../store/stats";
import { timeInStyle } from "../functions/timeInStyle";
import StatsIcon from "../../console/StatsIcon";

const StatsContainer = () => {
  const { userGameData } = useSelector(getStatsState);
  const {
    collectedWords,
    timePlayingLifetime,
    stepsTakenLifetime,
    streakRecord,
  } = userGameData;

  const size = 22;

  return (
    <View style={styles.container}>
      <StatsIcon
        iconName="basket-fill"
        text={collectedWords}
        size={size}
      />

      <StatsIcon
        iconName="foot-print"
        text={stepsTakenLifetime}
        size={size}
      />
      <StatsIcon
        iconName="clock-outline"
        text={timeInStyle(timePlayingLifetime)}
        size={size}
      />
      <StatsIcon
        iconName="trophy-variant"
        text={streakRecord}
        size={size}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});

export default StatsContainer;
