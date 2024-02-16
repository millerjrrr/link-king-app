import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import ConsoleInput from "../console/ConsoleInput";
import {
  getConsoleState,
  updateTimeOnThisWord,
} from "../store/console";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OptionsContainer from "../console/OptionsContainer";
import KeyboardAndStartButton from "../console/KeyboardAndStartButton";
import Tail from "../console/Tail";
import { fetchConsoleInfo } from "../console/functions/fetchConsoleInfo";
import ReadWordButton from "../console/ReadWordButton";
import StatsContainer from "../console/StatsContainer";
import InnerTabBackground from "../components/InnerTabBackground";
import BusyWrapper from "../components/BusyWrapper";

const Console = ({ navigation }) => {
  // ...loader management...
  const [page, refresh] = useState(true);

  const inputFieldRef = useRef(null);
  const { timeOnThisWord, timerIsOn, busy, connected } =
    useSelector(getConsoleState);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        fetchConsoleInfo(dispatch);
      },
    );
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchConsoleInfo(dispatch);
  }, [page]);

  useEffect(() => {
    const incrementTimer = async () => {
      if (timerIsOn && timeOnThisWord < 30 * 1000)
        dispatch(
          updateTimeOnThisWord(timeOnThisWord + 1000),
        );
    };
    const intervalId = setInterval(incrementTimer, 1000);
    return () => clearInterval(intervalId);
  }, [timerIsOn, timeOnThisWord]);

  return (
    <InnerTabBackground heading="Console">
      <BusyWrapper
        busy={false}
        connected={connected}
        refresh={() => refresh(!page)}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={
            Platform.OS === "ios" ? "padding" : undefined
          }
        >
          <StatsContainer />
          <OptionsContainer />
          <ReadWordButton />
          <ConsoleInput inputFieldRef={inputFieldRef} />
          <Tail />
          <KeyboardAndStartButton
            inputFieldRef={inputFieldRef}
          />
        </KeyboardAvoidingView>
      </BusyWrapper>
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
