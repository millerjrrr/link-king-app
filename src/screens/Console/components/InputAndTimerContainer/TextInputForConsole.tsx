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
  updateLocals,
} from "@src/store/console";
import appShadow from "@src/utils/appShadow";
import { speak } from "@src/utils/appSpeak";
import useColors from "@src/hooks/utilityHooks/useColors";
import ClosingTextInput from "@src/components/ClosingTextInput";
import { useEffect, useRef } from "react";
import { acceptAnswer } from "@src/utils/acceptAnswer";
import useSubmitAnswer from "@src/hooks/consoleHooks/useSubmitAnswer";
import useDebounce from "../../../../hooks/collectionHooks/useDebounce";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

interface Props {
  onSubmitEditing: () => void;
  setIsKeyboardVisible: (value: boolean) => void;
  color: string;
}
const TextInputForConsole: React.FC<Props> = ({
  onSubmitEditing,
  setIsKeyboardVisible,
  color,
}) => {
  const inputFieldRef = useRef<TextInput>(null);
  const dispatch = useDispatch();
  const submitAnswer = useSubmitAnswer();

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

  const debouncedFormValue = useDebounce(formValue, 100);

  useEffect(() => {
    if (acceptAnswer(debouncedFormValue, solutions)) {
      submitAnswer(debouncedFormValue);
    }
  }, [debouncedFormValue, solutions]);

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
    dispatch(
      updateLocals({ showTypeTranslationsInfoBox: false })
    );
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
          : placeholder ?? undefined
      }
      value={formValue}
      submitBehavior="submit"
      onKeyPress={(e) => {
        if (
          Platform.OS === "web" &&
          e.nativeEvent.key === "Enter"
        ) {
          e.preventDefault?.();
          onSubmitEditing();
        }
      }}
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
        },
        Platform.OS === "web"
          ? { outlineStyle: undefined }
          : {},
      ]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 70,
    textAlign: "center",
    padding: base * 7,
    borderRadius: 35,
    zIndex: 10,
  },
});

export default TextInputForConsole;
