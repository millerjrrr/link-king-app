import { Text, View, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { convertMsToTime } from "./functions/convertMsToTime";

const StatisticsContainer = ({ stats }) => {
  const { due, steps, time, streak } = stats;

  return (
    <View style={styles.container}>
      <Text style={styles.stat}>due: {due}</Text>
      <Text style={styles.stat}>steps: {steps}</Text>
      <Text style={styles.stat}>
        time: {convertMsToTime(time)}
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
    backgroundColor: colors.PRIMARY,
  },
  stat: {
    justifyContent: "center",
    alignItems: "center",
    color: colors.CONTRAST,
    marginRight: "auto",
    marginLeft: "auto",
  },
});

export default StatisticsContainer;
