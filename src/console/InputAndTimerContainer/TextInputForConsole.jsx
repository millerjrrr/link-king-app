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
import { getSettingsState } from "../../store/settings";

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
  const { colorScheme } = useSelector(getSettingsState);
  const placeholderTextColor = colors[colorScheme].LIGHTRED;
  const backgroundColor = colors[colorScheme].SECONDARY;

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
        placeholderTextColor,
      }}
      value={formValue}
      autoFocus={false}
      blurOnSubmit={false}
      enterKeyHint="enter"
      autoCapitalize={"none"}
      autoCompleteType="off"
      autoCorrect={false}
      selectionColor={color}
      style={[
        styles.input,
        {
          color,
          shadowColor: color,
          backgroundColor,
          borderColor: color,
        },
      ]}
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
        borderWidth: 2,
      },
    }),
  },
});

export default TextInputForConsole;
