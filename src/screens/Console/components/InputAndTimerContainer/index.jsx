import { StyleSheet, View } from "react-native";
import Timer from "./Timer";
import colors from "@src/utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { selectConsoleState } from "@src/store/console";
import TargetDetailsButton from "./TargetDetailsButton";
import { submitAnswer } from "@src/utils/consoleFunctions/submitAnswer";
import LoaderForTextInputForConsole from "./LoaderForTextInputForConsole";
import TextInputForConsole from "./TextInputForConsole";
import { settingsState } from "@src/store/settings";
import { useState } from "react";

const InputAndTimerContainer = ({
  inputFieldRef,
  setIsKeyboardVisible,
}) => {
  const {
    gamePlay: { solutions, tries },
    locals: { formValue, startedThisWord, showSolution },
  } = useSelector(selectConsoleState);

  const { colorScheme, golden } =
    useSelector(settingsState);
  const { RED, ORANGE, CONTRAST } = colors[colorScheme];

  const colorByTries = [RED, ORANGE, CONTRAST[golden]];

  const color = colorByTries[tries - 1];

  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(false);

  const sendAnswer = ({ timeUp }) => {
    if (!isDisabled) {
      setIsDisabled(true);
      submitAnswer({
        dispatch,
        formValue,
        solutions,
        tries,
        startedThisWord,
        showSolution,
        timeUp,
      });
      setTimeout(() => setIsDisabled(false), 400);
    }
  };

  const onComplete = () => sendAnswer({ timeUp: true });
  const onSubmitEditing = () =>
    sendAnswer({ timeUp: false });

  return (
    <View style={styles.formView}>
      <Timer {...{ onComplete, color }} />
      <LoaderForTextInputForConsole />
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
