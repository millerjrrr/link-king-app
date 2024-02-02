import {
  Text,
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import ConsoleInput from "../console/ConsoleInput";
import colors, { colorByTries } from "../utils/colors";
import clientWithAuth from "../api/clientWithAuth";
import {
  getConsoleState,
  updateBusyState,
  updateTries,
} from "../store/console";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptAnswer } from "../console/functions/acceptAnswer";
import OptionsContainer from "../console/OptionsContainer";
import KeyboardOff from "../console/KeyboardOff";
import Tail from "../console/Tail";
import { updateConsoleState } from "../console/functions/updateConsoleState";
import { fetchConsoleInfo } from "../console/functions/fetchConsoleInfo";

const Console = (props) => {
  const { attempt, options, tries, tail } =
    useSelector(getConsoleState);
  const { solutions, target } = attempt;
  const dispatch = useDispatch();

  useEffect(() => {
    fetchConsoleInfo(dispatch);
  }, []);

  const [formValue, setFormValue] = useState("");
  const [showSolution, setShowSolution] = useState(false);

  const submitAttempt = async () => {
    const answerAccepted = acceptAnswer(
      formValue,
      solutions,
    );
    if (answerAccepted) {
      setShowSolution(false);
      setFormValue("");
      try {
        const { data } = await clientWithAuth.post(
          "/api/v1/gameData/submitAttempt",
          {
            correct: answerAccepted,
            time: 1000,
          },
        );
        updateConsoleState(data, dispatch);
      } catch (error) {
        console.log("Console error:", error);
      }
    } else if (tries > 1) {
      dispatch(updateTries(tries - 1));
      console.log(answerAccepted);
    } else {
      try {
        const { data } = await clientWithAuth.post(
          "/api/v1/gameData/submitAttempt",
          {
            correct: answerAccepted,
            time: 1000,
          },
        );
        updateConsoleState(data, dispatch);
      } catch (error) {
        console.log("Console error:", error);
      }
      setFormValue("");
      setShowSolution(true);
    }
    return false;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios" ? "padding" : undefined
      }
    >
      <View style={styles.container}>
        <OptionsContainer options={options} />
        <Text
          style={[
            styles.target,
            { opacity: !options.blurred ? 1 : 0 },
          ]}
        >
          {target}
        </Text>
        <ConsoleInput
          value={formValue}
          placeholder={showSolution ? solutions[0] : null}
          style={{
            color: colorByTries[tries - 1],
            borderColor: colorByTries[tries - 1],
          }}
          onChangeText={(text) => setFormValue(text)}
          onSubmitEditing={submitAttempt}
        />
        <Tail tail={tail} />
        <View style={styles.keyboardIcon}>
          <KeyboardOff />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "top",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  target: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 40,
    color: colors.CONTRAST,
    visibility: "hidden",
    paddingBottom: 15,
  },
  keyboardIcon: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default Console;
