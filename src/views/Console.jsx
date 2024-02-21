import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  View,
} from "react-native";
import ConsoleInput from "../console/ConsoleInput";
import {
  getConsoleState,
  incrementTimeOnThisWord,
  updateTimerIsOn,
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
  const { timeOnThisWord, timerIsOn, connected } =
    useSelector(getConsoleState);
  const dispatch = useDispatch();

  useEffect(() => {
    // reload page details on navigation
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        fetchConsoleInfo(dispatch);
      },
    );
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // reload page details on page refresh (after internet disconnect)
    fetchConsoleInfo(dispatch);
  }, [page]);

  useEffect(() => {
    //increment the timer
    const increment = 500;
    const incrementTimer = async () => {
      if (timerIsOn)
        dispatch(incrementTimeOnThisWord(increment));
    };
    const intervalId = setInterval(
      incrementTimer,
      increment,
    );
    return () => clearInterval(intervalId);
  }, [timerIsOn]);

  useEffect(() => {
    // Pause the clock after 30 seconds
    if (timeOnThisWord >= 30 * 1000) {
      dispatch(updateTimerIsOn(false));
    }
  }, [timeOnThisWord]);

  return (
    <InnerTabBackground heading="Console">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === "ios" ? "padding" : undefined
        }
      >
        <BusyWrapper
          busy={false}
          connected={connected}
          refresh={() => refresh(!page)}
        >
          <View style={styles.container}>
            <StatsContainer />
            <OptionsContainer />
            <ReadWordButton />
            <ConsoleInput inputFieldRef={inputFieldRef} />
            <Tail />
            <KeyboardAndStartButton
              inputFieldRef={inputFieldRef}
            />
          </View>
        </BusyWrapper>
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
