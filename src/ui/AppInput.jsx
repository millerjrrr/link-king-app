import {
  Platform,
  StyleSheet,
  TextInput,
} from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";

const AppInput = (props) => {
  const { golden } = useSelector(getConsoleState);
  return (
    <TextInput
      {...props}
      autoCompleteType="off"
      autoCorrect={false}
      textContentType="none"
      placeholderTextColor={colors.INACTIVE_CONTRAST}
      style={[
        styles.input,
        props.style,
        {
          color: colors.CONTRAST[golden],
          shadowColor: colors.CONTRAST[golden],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    height: 45,
    borderRadius: 25,

    padding: 10,
    backgroundColor: colors.SECONDARY,

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
