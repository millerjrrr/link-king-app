import { StyleSheet, TextInput } from "react-native";
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
import appShadow from "../../utils/appShadow";

const TextInputForConsole = ({
  inputFieldRef,
  onSubmitEditing,
  setIsKeyboardVisible,
  color,
}) => {
  const dispatch = useDispatch();

  const onChangeText = (text) => {
    dispatch(updateFormValue(text));
  };

  const onFocus = () => {
    setIsKeyboardVisible(true);
    Speech.speak(attempt.target, {
      language: attempt.speechLang,
    });
    dispatch(updateTimerIsOn(true));
    dispatch(updateFormValue(""));
    dispatch(restartTheTimer());
  };

  const onBlur = () => {
    setIsKeyboardVisible(false);
  };

  const { formValue, attempt, showSolution } =
    useSelector(getConsoleState);
  const { colorScheme } = useSelector(getSettingsState);
  const placeholderTextColor = colors[colorScheme].LIGHTRED;
  const backgroundColor = colors[colorScheme].PRIMARY;

  const placeholder = showSolution
    ? attempt.solutions[0]
    : null;

  //font-size management
  let fontSize = 48;
  const length = formValue.length;
  if (length > 12) fontSize = (fontSize * 12) / length;

  if (placeholder && placeholder.length > 12)
    fontSize = (fontSize * 12) / placeholder.length;

  return (
    <TextInput
      ref={inputFieldRef}
      {...{
        onSubmitEditing,
        onChangeText,
        onFocus,
        onBlur,
        placeholder,
        placeholderTextColor,
      }}
      value={formValue}
      autoFocus={false}
      blurOnSubmit={false}
      enterKeyHint="enter"
      autoCapitalize={"none"}
      returnKeyType={"next"}
      autoCompleteType="off"
      keyboardType="visible-password"
      autoCorrect={false}
      selectionColor={color}
      style={[
        styles.input,
        {
          color,
          shadowColor: color,
          backgroundColor,
          borderColor: color,
          fontSize,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    width: "100%",
    height: 70,
    padding: 10,
    textAlign: "center",
    borderRadius: 35,
    ...appShadow(2),
  },
});

export default TextInputForConsole;
