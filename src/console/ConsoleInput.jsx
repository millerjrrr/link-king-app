import { StyleSheet, TextInput } from "react-native";
import colors from "../utils/colors";

const ConsoleInput = (props) => {
  const handleKeyPress = () => {
    if (props.onSubmitEditing) {
      props.onSubmitEditing();
    }
  };

  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.LIGHTRED}
      autoFocus={true}
      blurOnSubmit={false}
      enterKeyHint="enter"
      autoCapitalize={"none"}
      selectionColor={colors.CONTRAST}
      style={[styles.input, props.style]}
      onSubmitEditing={handleKeyPress}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 2,
    backgroundColor: colors.SECONDARY,
    height: 70,
    borderRadius: 25,
    padding: 10,
    textAlign: "center",
    fontSize: 40,
  },
});

export default ConsoleInput;
