import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@src/utils/colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { consoleState } from "@src/store/console";
import { settingsState } from "@src/store/settings";

const TargetDetailsButton = () => {
  const {
    timerIsOn,
    showSolution,
    attempt: { id, target, solutions, rating },
  } = useSelector(consoleState);

  const { colorScheme } = useSelector(settingsState);
  const color = colors[colorScheme].LIGHTRED;
  const navigation = useNavigation();

  const ticket = {
    id,
    target,
    solutions,
    rating,
    level: 1,
  };

  return !timerIsOn || showSolution ? (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("WordInfoScreen", {
          ticket,
          wrongAnswerReturned: true,
        })
      }
      style={styles.container}
    >
      <MaterialCommunityIcons
        {...{ name: "progress-question", size: 36, color }}
      />
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: "100%",
    aspectRatio: 1,
    borderRadius: 1000,
    position: "absolute",
    right: 0,
    zIndex: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TargetDetailsButton;
