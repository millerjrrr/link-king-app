import { StyleSheet, TextInput, View } from "react-native";
import Timer from "./Timer";
import colors, { colorByTries } from "../utils/colors";
import Loader from "../ui/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  getConsoleState,
  updateFormValue,
} from "../store/console";
import { acceptAnswer } from "./functions/acceptAnswer";
import { returnCorrectAnswerToServer } from "./functions/returnCorrectAnswerToServer";
import { returnWrongAnswerToServer } from "./functions/returnWrongAnswerToServer";
import { returnNextTry } from "./functions/returnNextTry";

const ConsoleInput = ({ inputFieldRef }) => {
  const {
    busy,
    formValue,
    options,
    showSolution,
    attempt,
    timeOnThisWord,
    timerIsOn,
    tries,
  } = useSelector(getConsoleState);

  const color = colorByTries[tries - 1];

  const dispatch = useDispatch();

  const submitAttempt = async () => {
    const answerAccepted = acceptAnswer(
      formValue,
      attempt.solutions,
    );

    if (answerAccepted) {
      returnCorrectAnswerToServer(
        dispatch,
        timeOnThisWord,
        timerIsOn,
      );
    } else if (tries > 1) {
      returnNextTry(dispatch, tries);
    } else {
      returnWrongAnswerToServer(
        dispatch,
        timeOnThisWord,
        timerIsOn,
      );
    }
    return false;
  };

  return (
    <View style={[styles.formView, { borderColor: color }]}>
      {options.timer ? (
        <Timer onComplete={submitAttempt} color={color} />
      ) : null}
      {busy ? (
        <View
          style={{
            position: "absolute",
            zIndex: 20,
          }}
        >
          <Loader size={24} />
        </View>
      ) : null}
      <TextInput
        ref={inputFieldRef}
        onChangeText={(text) =>
          dispatch(updateFormValue(text))
        }
        placeholder={
          showSolution ? attempt.solutions[0] : null
        }
        value={formValue}
        placeholderTextColor={colors.LIGHTRED}
        autoFocus={false}
        blurOnSubmit={false}
        enterKeyHint="enter"
        autoCapitalize={"none"}
        selectionColor={color}
        style={[styles.input, { color: color }]}
        onSubmitEditing={submitAttempt}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formView: {
    width: "100%",
    borderWidth: 2,
    backgroundColor: colors.SECONDARY,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  input: {
    width: "100%",
    height: 70,
    padding: 10,
    textAlign: "center",
    fontSize: 40,
  },
});

export default ConsoleInput;
