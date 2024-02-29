import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  View,
} from "react-native";
import ConsoleInput from "../console/ConsoleInput";
import {
  getConsoleState,
  reloadPage,
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
  const inputFieldRef = useRef(null);
  const { connected, page } = useSelector(getConsoleState);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInfo = () => fetchConsoleInfo(dispatch);
    const unsubscribe = navigation.addListener(
      "focus",
      fetchInfo,
    );

    fetchInfo();
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // reload page details on page refresh (after internet disconnect)
    fetchConsoleInfo(dispatch);
  }, [page]);

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
          refresh={() => dispatch(reloadPage())}
        >
          <View style={styles.content}>
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
    paddingHorizontal: 15,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
});

export default Console;
