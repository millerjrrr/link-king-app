import { Text, View, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { convertMsToTime } from "./functions/convertMsToTime";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";

const StatsContainer = () => {
  const { stats, timeOnThisWord, golden } =
    useSelector(getConsoleState);
  const { due, steps, time, streak, newWords } = stats;

  return (
    <View style={styles.container}>
      {newWords ? (
        <Text
          style={[
            styles.stat,
            { color: colors.CONTRAST[golden] },
          ]}
        >
          new: {newWords}
        </Text>
      ) : (
        <Text
          style={[
            styles.stat,
            { color: colors.CONTRAST[golden] },
          ]}
        >
          due: {due}
        </Text>
      )}

      <Text
        style={[
          styles.stat,
          { color: colors.CONTRAST[golden] },
        ]}
      >
        steps: {steps}
      </Text>
      <Text
        style={[
          styles.stat,
          { color: colors.CONTRAST[golden] },
        ]}
      >
        time: {convertMsToTime(time + timeOnThisWord)}
      </Text>
      <Text
        style={[
          styles.stat,
          { color: colors.CONTRAST[golden] },
        ]}
      >
        streak: {streak}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: colors.PRIMARY,
    zIndex: 10,
  },
  stat: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 2,
    marginBottom: 2,
  },
});

export default StatsContainer;
