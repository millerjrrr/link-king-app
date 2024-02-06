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
import InnerTabBackground from "../components/InnerTabBackground";

const Console = (props) => {
  const { attempt, options, stats, tries, tail } =
    useSelector(getConsoleState);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchConsoleInfo(dispatch);
  }, []);

  const [formValue, setFormValue] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [timeOnThisWord, setTimeOnThisWord] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);
  const [timerIsOn, setTimerIsOn] = useState(false);

  useEffect(() => {
    const incrementTimer = async () => {
      if (timerIsOn && timeOnThisWord < 30 * 1000)
        setTimeOnThisWord((prevTime) => prevTime + 1000);
    };
    const intervalId = setInterval(incrementTimer, 1000);
    return () => clearInterval(intervalId);
  }, [timerIsOn, timeOnThisWord]);

  const submitAttempt = async () => {
    const answerAccepted = acceptAnswer(
      formValue,
      attempt.solutions,
    );

    if (answerAccepted) {
      setShowSolution(false);
      setFormValue("");
      try {
        const time = timerIsOn
          ? Math.min(timeOnThisWord, 30 * 1000)
          : 0;
        console.log(time);
        const { data } = await clientWithAuth.post(
          "/api/v1/gameData/submitAttempt",
          {
            correct: answerAccepted,
            time,
          },
        );
        updateConsoleState(data, dispatch);
        Speech.speak(data.gamePlay.target, {
          language: data.gamePlay.speechLang,
        });
        setKey(key + 1);
        setIsPlaying(true);
        setTimeOnThisWord(0);
        setTimerIsOn(true);
      } catch (error) {
        console.log("Console error:", error);
      }
    } else if (tries > 1) {
      dispatch(updateTries(tries - 1));
      setKey(key + 1);
      setIsPlaying(true);
      setTimerIsOn(true);
    } else {
      try {
        const time = timerIsOn
          ? Math.min(timeOnThisWord, 30 * 1000)
          : 0;
        const { data } = await clientWithAuth.post(
          "/api/v1/gameData/submitAttempt",
          {
            correct: false,
            time,
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
      setTimeOnThisWord(0);
      setTimerIsOn(false);
    }
    return false;
  };

  return (
    <InnerTabBackground heading="Console">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === "ios" ? "padding" : undefined
        }
      >
        {/* <View style={styles.container}> */}
        <StatisticsContainer
          stats={stats}
          timeOnThisWord={timeOnThisWord}
        />
        <OptionsContainer options={options} />
        <ReadWordButton
          attempt={attempt}
          options={options}
        />
        <ConsoleInput
          key={key}
          onComplete={submitAttempt}
          value={formValue}
          isPlaying={isPlaying}
          timer={options.timer}
          placeholder={
            showSolution ? attempt.solutions[0] : null
          }
          color={colorByTries[tries - 1]}
          onChangeText={(text) => setFormValue(text)}
          onSubmitEditing={submitAttempt}
        />
        {!showSolution ? <Tail tail={tail} /> : null}
        <View style={styles.keyboardIcon}>
          <KeyboardOff />
        </View>
        {/* </View> */}
      </KeyboardAvoidingView>
    </InnerTabBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "top",
    alignItems: "center",
    paddingHorizontal: 10,
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
