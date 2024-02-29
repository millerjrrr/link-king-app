import {
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Timer from "./Timer";
import colors from "../utils/colors";
import Loader from "../ui/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  getConsoleState,
  updateFormValue,
  updateIsPlaying,
  updateLastAttempt,
  updateStartedThisWord,
  updateTimerIsOn,
} from "../store/console";
import { acceptAnswer } from "./functions/acceptAnswer";
import { returnCorrectAnswerToServer } from "./functions/returnCorrectAnswerToServer";
import { returnWrongAnswerToServer } from "./functions/returnWrongAnswerToServer";
import { returnNextTry } from "./functions/returnNextTry";
import AnswerDetailsButton from "./AnswerDetailsButton";
import * as Speech from "expo-speech";

const ConsoleInput = ({ inputFieldRef }) => {
  const {
    busy,
    formValue,
    options,
    showSolution,
    attempt,
    timeOnThisWord,
    startedThisWord,
    tries,
    golden,
  } = useSelector(getConsoleState);

  const colorByTries = [
    colors.RED,
    colors.ORANGE,
    colors.CONTRAST[golden],
  ];

  const color = colorByTries[tries - 1];

  const dispatch = useDispatch();

  const submitAttempt = async () => {
    dispatch(updateIsPlaying(false));

    const answerAccepted = acceptAnswer(
      formValue,
      attempt.solutions,
    );

    if (answerAccepted) {
      returnCorrectAnswerToServer(
        dispatch,
        startedThisWord,
      );
    } else if (tries > 1) {
      returnNextTry(dispatch, tries);
    } else {
      returnWrongAnswerToServer(dispatch, startedThisWord);
    }
    return false;
  };

  const onFocus = () => {
    Speech.speak(attempt.target, {
      language: attempt.speechLang,
    });
    dispatch(updateIsPlaying(true));
    dispatch(updateTimerIsOn(true));
    dispatch(updateStartedThisWord(new Date().getTime()));
    dispatch(updateFormValue(""));
  };

  return (
    <View style={styles.formView}>
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
      <AnswerDetailsButton
        onPress={() => {
          console.log("pressed");
        }}
      />
      <TextInput
        ref={inputFieldRef}
        onChangeText={(text) =>
          dispatch(updateFormValue(text))
        }
        onSubmitEditing={submitAttempt}
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
