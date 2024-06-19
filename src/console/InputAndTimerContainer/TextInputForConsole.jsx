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
import { speak } from "../functions/speak";

const TextInputForConsole = ({
  inputFieldRef,
  onSubmitEditing,
  setIsKeyboardVisible,
  color,
}) => {
  const dispatch = useDispatch();

  const {
    formValue,
    attempt,
    showSolution,
    options: { sound },
  } = useSelector(getConsoleState);
  const { target, speechLang: language } = attempt;
  const { colorScheme } = useSelector(getSettingsState);
  const placeholderTextColor = colors[colorScheme].LIGHTRED;
  const backgroundColor = colors[colorScheme].PRIMARY;
  const keyboardAppearance =
    colors[colorScheme].STATUSBAR.split("-")[0] === "dark"
      ? "light"
      : "dark";

  const onChangeText = (text) => {
    dispatch(updateFormValue(text));
  };

  const onFocus = async () => {
    setIsKeyboardVisible(true);
    speak({ target, language, sound });
    dispatch(updateTimerIsOn(true));
    dispatch(updateFormValue(""));
    dispatch(restartTheTimer());
  };

  const onBlur = () => {
    setIsKeyboardVisible(false);
  };

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
        placeholderTextColor,
        keyboardAppearance,
      }}
      placeholder={
        inputFieldRef.current?.isFocused()
          ? undefined
          : placeholder
      }
      value={formValue}
      blurOnSubmit={false}
      enterKeyHint="enter"
      autoCapitalize={"none"}
      returnKeyType={"next"}
      autoCompleteType="off"
      spellCheck={true}
      selectionColor={color + "55"}
      underlineColorAndroid="transparent"
      textContentType="none"
      keyboardType="default"
      allowFontScaling={false}
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
    width: "100%",
    height: 70,
    textAlign: "center",
    paddingBottom: 7,
    borderRadius: 35,
    ...appShadow(2),
  },
});

export default TextInputForConsole;
