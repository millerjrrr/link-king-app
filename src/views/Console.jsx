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
import ReadWordButton from "../console/ReadWordButton";
import StatisticsContainer from "../console/StatisticsContainer";
import * as Speech from "expo-speech";
import Timer from "../console/Timer";

const Console = (props) => {
  const { attempt, options, stats, tries, tail } =
    useSelector(getConsoleState);
  const { solutions, target, speechLang } = attempt;
  const dispatch = useDispatch();

  useEffect(() => {
    fetchConsoleInfo(dispatch);
  }, []);

  const [formValue, setFormValue] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [timeOnThisWord, setTimeOnThisWord] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const incrementTimer = () => {
      setTimeOnThisWord((prevTime) => prevTime + 0.1);
    };
    const intervalId = setInterval(incrementTimer, 100);
    return () => clearInterval(intervalId);
  }, []);

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
        Speech.speak(data.gamePlay.target, {
          language: data.gamePlay.speechLang,
        });
        setKey(key + 1);
        setIsPlaying(true);
        console.log(timeOnThisWord);
        setTimeOnThisWord(0);
      } catch (error) {
        console.log("Console error:", error);
      }
    } else if (tries > 1) {
      dispatch(updateTries(tries - 1));
      setKey(key + 1);
      setIsPlaying(true);
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
        Speech.speak(data.gamePlay.target, {
          language: data.gamePlay.speechLang,
        });
      } catch (error) {
        console.log("Console error:", error);
      }
      setFormValue("");
      setShowSolution(true);
      setKey(key + 1);
      setIsPlaying(false);
      console.log(timeOnThisWord);
      setTimeOnThisWord(0);
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
        <StatisticsContainer stats={stats} />
        <OptionsContainer options={options} />
        {options.blurred ? (
          <ReadWordButton attempt={attempt} />
        ) : (
          <Text style={styles.target}>{target}</Text>
        )}
        <ConsoleInput
          key={key}
          value={formValue}
          isPlaying={isPlaying}
          placeholder={showSolution ? solutions[0] : null}
          color={colorByTries[tries - 1]}
          onChangeText={(text) => setFormValue(text)}
          onSubmitEditing={submitAttempt}
        />
        {!showSolution ? <Tail tail={tail} /> : null}
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
