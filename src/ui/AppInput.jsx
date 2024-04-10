import { StyleSheet, TextInput } from "react-native";
import colors from "../utils/colors";
import appShadow from "../utils/appShadow";

//This may be used in some settings tabs in the future
const AppInput = (props) => {
  return (
    <TextInput
      {...props}
      autoCompleteType="off"
      autoCorrect={false}
      textContentType="none"
      placeholderTextColor={colors.dark.INACTIVE_CONTRAST}
      style={[styles.input, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderRadius: 25,
    padding: 10,
    backgroundColor: colors.dark.SECONDARY,
    color: colors.dark.CONTRAST[0],
    shadowColor: colors.dark.CONTRAST[0],
    borderColor: colors.dark.CONTRAST[0],
    ...appShadow(1),
  },
});

export default AppInput;
