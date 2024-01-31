import {
  Text,
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import ConsoleInput from "../console/ConsoleInput";
import colors from "../utils/colors";
import clientWithAuth from "../api/clientWithAuth";
import {
  getConsoleState,
  updateBusyState,
  updateSolutions,
  updateTarget,
  updateTries,
} from "../store/console";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptAnswer } from "../console/functions/acceptAnswer";
import OptionsContainer from "../console/OptionsContainer";
import KeyboardOff from "../console/KeyboardOff";

const Console = (props) => {
  const colorByTries = [
    colors.RED,
    colors.ORANGE,
    colors.CONTRAST,
  ];

  const { target, solutions, tries } =
    useSelector(getConsoleState);
  const dispatch = useDispatch();

  const updateConsoleState = (resData) => {
    const { attempt, tries } = resData;
    dispatch(updateTarget(attempt.target));
    dispatch(updateSolutions(attempt.solutions));
    dispatch(updateTries(tries));
    dispatch(updateBusyState(false));
  };

  useEffect(() => {
    const fetchConsoleInfo = async () => {
      dispatch(updateBusyState(true));
      try {
        const { data } = await clientWithAuth.get(
          "/api/v1/gameData/sendGameState",
        );
        updateConsoleState(data.data);
      } catch (err) {
        console.log("Console error: ");
      } finally {
        dispatch(updateBusyState(false));
      }
    };

    fetchConsoleInfo();
  }, []);

  const [formValue, setFormValue] = useState("");

  const submitAttempt = async () => {
    const answerAccepted = acceptAnswer(
      formValue,
      solutions,
    );
    if (answerAccepted) {
      setFormValue("");
      try {
        const { data } = await clientWithAuth.post(
          "/api/v1/gameData/submitAttempt",
          {
            correct: answerAccepted,
            time: 1000,
          },
        );
        console.log(data.data.attempt.solutions);
        updateConsoleState(data.data);
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
        console.log(data.data.attempt.solutions);
        updateConsoleState(data.data);
      } catch (error) {
        console.log("Console error:", error);
      }
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
        <OptionsContainer />
        <Text style={styles.target}>{target}</Text>
        <ConsoleInput
          value={formValue}
          style={{
            color: colorByTries[tries - 1],
            borderColor: colorByTries[tries - 1],
          }}
          onChangeText={(text) => setFormValue(text)}
          onSubmitEditing={submitAttempt}
        />
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
    paddingTop: 70,
  },
  target: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 40,
    color: colors.CONTRAST,
    paddingBottom: 15,
  },
  keyboardIcon: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default Console;
