import {
  Platform,
  StyleSheet,
  TextInput,
} from "react-native";
import colors from "../utils/colors";

//This may be used in some settings tabs in the future
const AppInput = (props) => {
  return (
    <TextInput
      {...props}
      autoCompleteType="off"
      autoCorrect={false}
      textContentType="none"
      placeholderTextColor={
        colors.default.INACTIVE_CONTRAST
      }
      style={[styles.input, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: colors.default.SECONDARY,
    height: 45,
    borderRadius: 25,
    padding: 10,
    backgroundColor: colors.default.SECONDARY,
    color: colors.default.CONTRAST[0],
    shadowColor: colors.default.CONTRAST[0],
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default AppInput;
