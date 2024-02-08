import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import ConsoleInput from "../console/ConsoleInput";
import { colorByTries } from "../utils/colors";
import clientWithAuth from "../api/clientWithAuth";
import {
  getConsoleState,
  updateTries,
} from "../store/console";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptAnswer } from "../console/functions/acceptAnswer";
import OptionsContainer from "../console/OptionsContainer";
import KeyboardControls from "../console/KeyboardControls";
import Tail from "../console/Tail";
import { updateConsoleState } from "../console/functions/updateConsoleState";
import { fetchConsoleInfo } from "../console/functions/fetchConsoleInfo";
import ReadWordButton from "../console/ReadWordButton";
import StatisticsContainer from "../console/StatisticsContainer";
import * as Speech from "expo-speech";
import InnerTabBackground from "../components/InnerTabBackground";

const Console = () => {
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

  const returnCorrectAnswerToServer = async () => {
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
          correct: true,
          time,
        },
      );
      updateConsoleState(data, dispatch);
      Speech.speak(data.gamePlay.target, {
        language: data.gamePlay.speechLang,
      });
      setIsPlaying(true);
      setTimeOnThisWord(0);
      setTimerIsOn(true);
      setKey(key + 1); // used to highlight the input and restart the timer
    } catch (error) {
      console.log("Console error:", error);
    }
  };

  const nextTry = async () => {
    dispatch(updateTries(tries - 1));
    setKey(key + 1); // used to highlight the input and restart the timer
    setIsPlaying(true);
    setTimerIsOn(true);
  };

  const returnWrongAnswerToServer = async () => {
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
    setKey(key + 1); // used to highlight the input and restart the timer
    setIsPlaying(false);
    setTimeOnThisWord(0);
    setTimerIsOn(false);
  };

  const submitAttempt = async () => {
    const answerAccepted = acceptAnswer(
      formValue,
      attempt.solutions,
    );

    if (answerAccepted) {
      returnCorrectAnswerToServer();
    } else if (tries > 1) {
      nextTry();
    } else {
      returnWrongAnswerToServer();
    }
    return false;
  };

  const startFunction = async () => {
    // fetchConsoleInfo(dispatch);
    Speech.speak(attempt.target, {
      language: attempt.speechLang,
    });
    setIsPlaying(true);
    setTimerIsOn(true);
    setFormValue("");
    setKey(key + 1); // used to highlight the input
  };

  return (
    <InnerTabBackground heading="Console">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === "ios" ? "padding" : undefined
        }
      >
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
        <KeyboardControls
          dontKnowFunction={returnWrongAnswerToServer}
          startFunction={startFunction}
          isPlaying={isPlaying}
        />
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
    paddingHorizontal: 15,
  },
});

export default Console;
