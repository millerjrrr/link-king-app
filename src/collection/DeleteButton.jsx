import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getColorsState } from "../store/colors";

const DeleteButton = ({ onPress }) => {
  const { colorScheme, golden } =
    useSelector(getColorsState);
  const color = colors[colorScheme].CONTRAST[golden];
  return (
    <TouchableOpacity
      {...{
        style: [
          styles.container,
          { backgroundColor: colors[colorScheme].PRIMARY },
        ],
        onPress,
      }}
    >
      <AntDesign {...{ name: "delete", size: 32, color }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DeleteButton;
