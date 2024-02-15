import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../utils/colors";

const DeleteButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <AntDesign
        name="delete"
        size={32}
        color={colors.CONTRAST}
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
