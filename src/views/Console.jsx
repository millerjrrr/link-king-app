import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import InputAndTimerContainer from "../console/InputAndTimerContainer";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import OptionsContainer from "../console/OptionsContainer";
import KeyboardAndStartButton from "../console/KeyboardAndStartButton";
import Tail from "../console/Tail";
import { fetchConsoleInfo } from "../console/functions/fetchConsoleInfo";
import ReadWordButton from "../console/ReadWordButton";
import StatsContainer from "../console/StatsContainer";
import InnerTabContainer from "../components/containers/InnerTabContainer";
import { getAuthState } from "../store/auth";

const Console = ({ navigation }) => {
  const inputFieldRef = useRef(null);
  const { refresh } = useSelector(getAuthState);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInfo = () => fetchConsoleInfo({ dispatch });
    const unsubscribe = navigation.addListener(
      "focus",
      fetchInfo,
    );

    fetchInfo();
    return unsubscribe;
  }, [navigation, refresh]);

  const help = () => {
    console.log("help");
  };

  return (
    <InnerTabContainer {...{ heading: "Console", help }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === "ios" ? "padding" : undefined
        }
      >
        <StatsContainer />
        <OptionsContainer />
        <ReadWordButton />
        <InputAndTimerContainer
          inputFieldRef={inputFieldRef}
        />
        <Tail />
        <KeyboardAndStartButton
          inputFieldRef={inputFieldRef}
        />
      </KeyboardAvoidingView>
    </InnerTabContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    zIndex: 1,
  },
});

export default Console;
