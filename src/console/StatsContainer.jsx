import { Text, View, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { convertMsToTime } from "./functions/convertMsToTime";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";

const StatsContainer = () => {
  const { stats, timeOnThisWord } =
    useSelector(getConsoleState);
  const { due, steps, time, streak, newWords } = stats;

  return (
    <View style={styles.container}>
      {newWords ? (
        <Text style={styles.stat}>new: {newWords}</Text>
      ) : (
        <Text style={styles.stat}>due: {due}</Text>
      )}

      <Text style={styles.stat}>steps: {steps}</Text>
      <Text style={styles.stat}>
        time: {convertMsToTime(time + timeOnThisWord)}
      </Text>
      <Text style={styles.stat}>streak: {streak}</Text>
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
    color: colors.CONTRAST,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 2,
    marginBottom: 2,
  },
});

export default StatsContainer;
