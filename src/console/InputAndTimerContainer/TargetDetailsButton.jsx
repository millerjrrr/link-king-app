import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import { getColorsState } from "../../store/colors";

const TargetDetailsButton = () => {
  const { showSolution } = useSelector(getConsoleState);
  const { colorScheme } = useSelector(getColorsState);
  const color = colors[colorScheme].RED;
  const navigation = useNavigation();

  return showSolution ? (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("TargetDetailsScreen")
      }
      style={styles.container}
    >
      <MaterialCommunityIcons
        {...{ name: "progress-question", size: 24, color }}
      />
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    width: 60,
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