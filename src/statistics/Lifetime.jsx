import { Text, View, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { timeInStyle } from "./functions/timeInStyle";
import StatsIcon from "./StatsIcon";

const Lifetime = ({ gd }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "top",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={styles.title}>Stats Lifetime</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          <StatsIcon
            name="Time Playing"
            iconName="clock-outline"
            value={timeInStyle(gd.timePlayingLifetime)}
          />
          <StatsIcon
            name="Steps Lifetime"
            iconName="foot-print"
            value={gd.stepsTakenLifetime}
          />
        </View>
        <View style={styles.row}>
          <StatsIcon
            name="Lifetime Pace"
            iconName="run-fast"
            value={Math.round(
              (gd.stepsTakenLifetime /
                gd.timePlayingLifetime) *
                60 *
                1000,
            )}
            units=" steps/min"
          />
          <StatsIcon
            name="Collected Words"
            iconName="basket-fill"
            value={
              gd.collectedWordsDayStart +
              gd.collectedWordsToday
            }
          />
        </View>
        <View style={styles.row}>
          <StatsIcon
            name="Lifetime Streak"
            iconName="trophy-variant"
            value={gd.streakRecord}
          />
          <StatsIcon
            name="Rating"
            iconName="account-arrow-up"
            value={Math.round(gd.rating)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.CONTRAST,
    fontSize: 40,
    margin: 30,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  table: {
    margin: 20,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: colors.CONTRAST,
    padding: 5,
    fontSize: 20,
  },
});

export default Lifetime;
