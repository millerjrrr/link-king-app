import { Text, View, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { timeInStyle } from "./functions/timeInStyle";
import StatsIcon from "./StatsIcon";

const Today = ({ gd }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "top",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={styles.title}>Stats Today</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          <StatsIcon
            name="Time Playing"
            iconName="clock-outline"
            value={timeInStyle(gd.timePlayingToday)}
          />
          <StatsIcon
            name="Steps Today"
            iconName="foot-print"
            value={gd.stepsTakenToday}
          />
        </View>
        <View style={styles.row}>
          <StatsIcon
            name="Today's Pace"
            iconName="run-fast"
            value={
              gd.timePlayingToday
                ? Math.round(
                    (gd.stepsTakenToday /
                      gd.timePlayingToday) *
                      60 *
                      1000,
                  )
                : 0
            }
            units=" steps/min"
          />
          <StatsIcon
            name="Collected Words"
            iconName="basket-fill"
            value={gd.collectedWordsToday}
          />
        </View>
        <View style={styles.row}>
          <StatsIcon
            name="Today's Streak"
            iconName="trophy-variant"
            value={gd.streakToday}
          />
          <StatsIcon
            name="Remaining"
            iconName="target"
            value={gd.dueToday.length}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.CONTRAST,
    fontSize: 50,
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

export default Today;
