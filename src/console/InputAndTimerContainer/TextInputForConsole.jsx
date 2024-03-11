import {
  Platform,
  StyleSheet,
  TextInput,
} from "react-native";
import colors from "../../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  getConsoleState,
  restartTheTimer,
  updateFormValue,
  updateTimerIsOn,
} from "../../store/console";
import * as Speech from "expo-speech";

const TextInputForConsole = ({
  inputFieldRef,
  onSubmitEditing,
  color,
}) => {
  const dispatch = useDispatch();

  const onChangeText = (text) => {
    dispatch(updateFormValue(text));
  };

  const onFocus = () => {
    Speech.speak(attempt.target, {
      language: attempt.speechLang,
    });
    dispatch(updateTimerIsOn(true));
    dispatch(updateFormValue(""));
    dispatch(restartTheTimer());
  };

  const { formValue, attempt, showSolution } =
    useSelector(getConsoleState);
  const placeholder = showSolution
    ? attempt.solutions[0]
    : null;

  return (
    <TextInput
      ref={inputFieldRef}
      {...{
        onSubmitEditing,
        onChangeText,
        onFocus,
        placeholder,
      }}
      value={formValue}
      placeholderTextColor={colors.RED}
      autoFocus={false}
      blurOnSubmit={false}
      enterKeyHint="enter"
      autoCapitalize={"none"}
      autoCompleteType="off"
      autoCorrect={false}
      selectionColor={color}
      style={[styles.input, { color, shadowColor: color }]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 70,
    padding: 10,
    textAlign: "center",
    fontSize: 48,
    borderRadius: 35,
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

export default TextInputForConsole;
