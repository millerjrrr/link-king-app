import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { statsState } from "@src/store/stats";
import { timeInStyle } from "@src/utils/timeInStyle";
import StatsIcon from "@src/screens/Console/components/StatsContainer/StatsIcon";
import useColors from "@src/hooks/utilityHooks/useColors";
import appShadow from "@src/utils/appShadow";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const StatsContainer: React.FC<{ size?: number }> = ({
  size = 22,
}) => {
  const {
    userGameData: {
      collectedWords,
      timePlayingLifetime,
      stepsTakenLifetime,
      streakRecord,
    },
  } = useSelector(statsState);

  const { CONTRAST, SECONDARY } = useColors();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: SECONDARY,
          ...appShadow(CONTRAST),
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
    padding: base * 10,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
});

export default StatsContainer;
