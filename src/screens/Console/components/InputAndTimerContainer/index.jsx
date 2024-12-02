import { StyleSheet, View } from "react-native";
import Timer from "./Timer";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { selectConsoleState } from "@src/store/console";
import TargetDetailsButton from "./TargetDetailsButton";
import LoaderForTextInputForConsole from "./LoaderForTextInputForConsole";
import TextInputForConsole from "./TextInputForConsole";
import { settingsState } from "@src/store/settings";
import { useState } from "react";
import useSubmitAnswer from "@src/hooks/consoleHooks/useSubmitAnswer";

const InputAndTimerContainer = ({
  inputFieldRef,
  setIsKeyboardVisible,
}) => {
  const {
    gamePlay: { tries },
  } = useSelector(selectConsoleState);

  const { colorScheme, golden } =
    useSelector(settingsState);
  const { RED, ORANGE, CONTRAST } = colors[colorScheme];

  const colorByTries = [RED, ORANGE, CONTRAST[golden]];

  const color = colorByTries[tries - 1];

  const submitAnswer = useSubmitAnswer();

  // this temporarily disables sendAnswer to avoid
  // accidental double tap
  const [isDisabled, setIsDisabled] = useState(false);

  const sendAnswer = ({ timeOut }) => {
    if (!isDisabled) {
      setIsDisabled(true);
      submitAnswer(timeOut);
      setTimeout(() => setIsDisabled(false), 400);
    }
  };

  const onComplete = () => sendAnswer({ timeOut: true });
  const onSubmitEditing = () =>
    sendAnswer({ timeOut: false });

  return (
    <View style={styles.formView}>
      <Timer onComplete={onComplete} color={color} />
      <LoaderForTextInputForConsole color={color} />
      <TargetDetailsButton />
      <TextInputForConsole
        {...{
          onSubmitEditing,
          inputFieldRef,
          setIsKeyboardVisible,
          color,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    marginBottom: 10,
  },
});

export default InputAndTimerContainer;
