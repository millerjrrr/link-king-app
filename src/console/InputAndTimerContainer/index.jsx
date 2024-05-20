import { StyleSheet, View } from "react-native";
import Timer from "./Timer";
import colors from "../../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import TargetDetailsButton from "./TargetDetailsButton";
import { submitAnswer } from "../functions/submitAnswer";
import LoaderForTextInputForConsole from "./LoaderForTextInputForConsole";
import TextInputForConsole from "./TextInputForConsole";
import { getSettingsState } from "../../store/settings";
import { useState } from "react";

const InputAndTimerContainer = ({
  inputFieldRef,
  setIsKeyboardVisible,
}) => {
  const {
    formValue,
    attempt: { solutions },
    tries,
    startedThisWord,
    showSolution,
  } = useSelector(getConsoleState);

  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const { RED, ORANGE, CONTRAST } = colors[colorScheme];

  const colorByTries = [RED, ORANGE, CONTRAST[golden]];

  const color = colorByTries[tries - 1];

  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(false);

  const sendAnswer = () => {
    if (!isDisabled) {
      setIsDisabled(true);
      submitAnswer({
        dispatch,
        formValue,
        solutions,
        tries,
        startedThisWord,
        showSolution,
      });
      setTimeout(() => setIsDisabled(false), 400);
    }
  };

  return (
    <View style={styles.formView}>
      <Timer onComplete={sendAnswer} {...{ color }} />
      <LoaderForTextInputForConsole />
      <TargetDetailsButton />
      <TextInputForConsole
        {...{
          onSubmitEditing: sendAnswer,
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
  },
});

export default InputAndTimerContainer;
