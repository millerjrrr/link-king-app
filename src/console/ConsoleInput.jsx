import {
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Timer from "./Timer";
import colors from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  getConsoleState,
  restartTheTimer,
  updateFormValue,
  updateTimerIsOn,
} from "../store/console";
import AnswerDetailsButton from "./AnswerDetailsButton";
import * as Speech from "expo-speech";
import Loader from "../ui/Loaders/Loader";
import { submitAnswer } from "./functions/submitAnswer";

const ConsoleInput = ({ inputFieldRef }) => {
  const {
    formValue,
    attempt,
    tries,
    startedThisWord,
    showSolution,
    busy,
    options,
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
    submitAnswer(
      dispatch,
      formValue,
      attempt.solutions,
      tries,
      startedThisWord,
      showSolution,
    );
  };

  const onFocus = () => {
    Speech.speak(attempt.target, {
      language: attempt.speechLang,
    });
    dispatch(updateTimerIsOn(true));
    dispatch(updateFormValue(""));
    dispatch(restartTheTimer());
  };

  return (
    <View style={styles.formView}>
      {options.timer ? (
        <Timer onComplete={sendAnswer} color={color} />
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
      <AnswerDetailsButton />
      <TextInput
        ref={inputFieldRef}
        onChangeText={(text) =>
          dispatch(updateFormValue(text))
        }
        onSubmitEditing={sendAnswer}
        onFocus={onFocus}
        placeholder={
          showSolution ? attempt.solutions[0] : null
        }
        value={formValue}
        placeholderTextColor={colors.LIGHTRED}
        autoFocus={false}
        blurOnSubmit={false}
        enterKeyHint="enter"
        autoCapitalize={"none"}
        autoCompleteType="off"
        autoCorrect={false}
        selectionColor={color}
        style={[
          styles.input,
          { color: color, shadowColor: color },
        ]}
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
  input: {
    width: "100%",
    height: 70,
    padding: 10,
    textAlign: "center",
    fontSize: 40,
    borderRadius: 35,
    backgroundColor: colors.SECONDARY,
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
      },
    }),
  },
});

export default ConsoleInput;
