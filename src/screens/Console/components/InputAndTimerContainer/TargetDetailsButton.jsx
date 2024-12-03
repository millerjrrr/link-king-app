import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@src/utils/colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectConsoleState } from "@src/store/console";
import { settingsState } from "@src/store/settings";

const TargetDetailsButton = () => {
  const {
    display: { tail },
    gamePlay: { id, target, solutions, rating, tries },
  } = useSelector(selectConsoleState);

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

  return tries === 1 && tail.length === 0 ? (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Word Details", {
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
