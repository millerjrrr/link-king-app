import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { statsState } from "@src/store/stats";
import { timeInStyle } from "@src/utils/timeInStyle";
import StatsIcon from "@src/screens/Console/components/StatsContainer/StatsIcon";
import { settingsState } from "@src/store/settings";
import colors from "@src/utils/colors";

const StatsContainer = ({ size = 22 }) => {
  const {
    userGameData: {
      collectedWords,
      timePlayingLifetime,
      stepsTakenLifetime,
      streakRecord,
    },
  } = useSelector(statsState);

  const { colorScheme, golden } =
    useSelector(settingsState);

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
