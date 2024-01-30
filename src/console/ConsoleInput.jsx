import { StyleSheet, TextInput } from "react-native";
import colors from "../utils/colors";

const ConsoleInput = (props) => {
  return (
    <TextInput
      {...props}
      selectionColor={colors.CONTRAST}
      placeholderTextColor={colors.INACTIVE_CONTRAST}
      style={[styles.input, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: colors.CONTRAST,
    backgroundColor: colors.SECONDARY,
    height: 70,
    borderRadius: 25,
    color: colors.CONTRAST,
    padding: 10,
    textAlign: "center",
    fontSize: 40,
  },
});

export default ConsoleInput;
