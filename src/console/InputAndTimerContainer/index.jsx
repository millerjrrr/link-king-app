import { StyleSheet, View } from "react-native";
import Timer from "../Timer";
import colors from "../../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import AnswerDetailsButton from "./AnswerDetailsButton";
import { submitAnswer } from "../functions/submitAnswer";
import LoaderForConsoleInput from "./LoaderForConsoleInput";
import ConsoleInput from "./ConsoleInput";

const InputAndTimerContainer = ({ inputFieldRef }) => {
  const {
    formValue,
    attempt: { solutions },
    tries,
    startedThisWord,
    showSolution,
    golden,
  } = useSelector(getConsoleState);

  const colorByTries = [
    colors.RED,
    colors.ORANGE,
    colors.CONTRAST[golden],
  ];

  const color = colorByTries[tries - 1];

  const dispatch = useDispatch();

  const sendAnswer = () => {
    submitAnswer({
      dispatch,
      formValue,
      solutions,
      tries,
      startedThisWord,
      showSolution,
    });
  };

  return (
    <View style={styles.formView}>
      <Timer onComplete={sendAnswer} {...{ color }} />
      <LoaderForConsoleInput />
      <AnswerDetailsButton />
      <ConsoleInput
        onSubmitEditing={sendAnswer}
        {...{
          inputFieldRef,
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
