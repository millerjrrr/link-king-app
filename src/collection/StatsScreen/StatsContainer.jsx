import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getStatsState } from "../../store/stats";
import { timeInStyle } from "../functions/timeInStyle";
import StatsIcon from "../../console/StatsIcon";

const StatsContainer = ({ size = 22 }) => {
  const {
    userGameData: {
      collectedWords,
      timePlayingLifetime,
      stepsTakenLifetime,
      streakRecord,
    },
  } = useSelector(getStatsState);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <StatsIcon
          {...{
            name: "clock-outline",
            text: timeInStyle(timePlayingLifetime),
            size,
          }}
        />
        <StatsIcon
          {...{
            name: "basket-fill",
            text: collectedWords,
            size,
          }}
        />
        <StatsIcon
          {...{
            name: "foot-print",
            text: stepsTakenLifetime,
            size,
          }}
        />
      </View>
      <View style={styles.rowContainer}>
        <StatsIcon
          {...{
            name: "trophy-variant",
            text: streakRecord,
            size,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
    paddingVertical: 5,
  },
});

export default StatsContainer;
