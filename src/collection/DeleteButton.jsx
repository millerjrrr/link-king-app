import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../utils/colors";
import { getConsoleState } from "../store/console";
import { useSelector } from "react-redux";

const DeleteButton = ({ onPress }) => {
  const { golden } = useSelector(getConsoleState);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <AntDesign
        name="delete"
        size={32}
        color={colors.CONTRAST[golden]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: colors.PRIMARY,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DeleteButton;
