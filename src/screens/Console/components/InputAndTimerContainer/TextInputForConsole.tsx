import {
  Platform,
  StyleSheet,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectConsoleState,
  restartTheTimer,
  updateFormValue,
  updateTimerIsOn,
  updateShowSolution,
} from "@src/store/console";
import appShadow from "@src/utils/appShadow";
import { speak } from "@src/utils/appSpeak";
import useColors from "@src/hooks/utilityHooks/useColors";
import ClosingTextInput from "@src/components/ClosingTextInput";

interface Props {
  inputFieldRef: React.RefObject<TextInput>;
  onSubmitEditing: () => void;
  setIsKeyboardVisible: (value: boolean) => void;
  color: string;
}
const TextInputForConsole: React.FC<Props> = ({
  inputFieldRef,
  onSubmitEditing,
  setIsKeyboardVisible,
  color,
}) => {
  const dispatch = useDispatch();

  const {
    locals: {
      formValue,
      showSolution,
      options: { sound },
    },
    gamePlay: { target, speechLang: language, solutions },
  } = useSelector(selectConsoleState);

  const { LIGHTRED, PRIMARY, STATUSBAR } = useColors();
  const keyboardAppearance =
    STATUSBAR === "dark" ? "light" : "dark";

  const onChangeText = (text: string) => {
    dispatch(updateFormValue(text));
  };

  const onFocus = async () => {
    setIsKeyboardVisible(true);
    speak({ target, language, sound });
    dispatch(updateTimerIsOn(true));
    dispatch(updateShowSolution(false));
    dispatch(updateFormValue(""));
    dispatch(restartTheTimer());
  };

  const onBlur = () => {
    setIsKeyboardVisible(false);
  };

  const placeholder = showSolution ? solutions[0] : null;

  //font-size management
  let fontSize = 48;
  const length = formValue.length;
  if (length > 11) fontSize = (fontSize * 11) / length;

  if (placeholder && placeholder.length > 11)
    fontSize = (fontSize * 11) / placeholder.length;

  return (
    <ClosingTextInput
      ref={inputFieldRef}
      {...{
        onSubmitEditing,
        onChangeText,
        onFocus,
        onBlur,
      }}
      keyboardAppearance={keyboardAppearance}
      placeholderTextColor={LIGHTRED}
      placeholder={
        inputFieldRef.current?.isFocused()
          ? undefined
          : (placeholder ?? undefined)
      }
      value={formValue}
      blurOnSubmit={false}
      enterKeyHint="enter"
      autoCapitalize="none"
      returnKeyType="next"
      autoComplete="off"
      spellCheck
      selectionColor={color + "55"}
      underlineColorAndroid="transparent"
      textContentType="none"
      keyboardType="default"
      allowFontScaling={false}
      style={[
        styles.input,
        {
          color,
          ...appShadow(color),
          backgroundColor: PRIMARY,
          fontSize,
          ...(Platform.OS === "web"
            ? { outlineStyle: "none" }
            : {}),
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
    zIndex: 10,
  },
});

export default TextInputForConsole;
