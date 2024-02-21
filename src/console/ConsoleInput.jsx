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
      returnCorrectAnswerToServer(dispatch, timeOnThisWord);
    } else if (tries > 1) {
      returnNextTry(dispatch, tries);
    } else {
      returnWrongAnswerToServer(dispatch, timeOnThisWord);
    }
    return false;
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
        autoCompleteType="off"
        autoCorrect={false}
        selectionColor={color}
        style={[
          styles.input,
          { color: color, shadowColor: color },
          styles.commonProp,
        ]}
        onSubmitEditing={submitAttempt}
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
  },
  ...Platform.select({
    ios: {
      commonProp: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
    },
    android: {
      commonProp: {
        elevation: 3,
      },
    },
  }),
});

export default ConsoleInput;
