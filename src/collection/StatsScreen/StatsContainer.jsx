import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getStatsState } from "@src/store/stats";
import { timeInStyle } from "../functions/timeInStyle";
import StatsIcon from "../../screens/Console/components/StatsIcon";
import { getSettingsState } from "@src/store/settings";
import colors from "@src/utils/colors";

const StatsContainer = ({ size = 22 }) => {
  const {
    userGameData: {
      collectedWords,
      timePlayingLifetime,
      stepsTakenLifetime,
      streakRecord,
    },
  } = useSelector(getStatsState);

  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );

  const color = colors[colorScheme].CONTRAST[golden];

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: color,
        },
      ]}
    >
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
      </View>
      <View style={styles.rowContainer}>
        <StatsIcon
          {...{
            name: "foot-print",
            text: stepsTakenLifetime,
            size,
          }}
        />
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
    margin: 15,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
});

export default StatsContainer;
