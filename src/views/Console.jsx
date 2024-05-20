import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import InputAndTimerContainer from "../console/InputAndTimerContainer";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OptionsContainer from "../console/OptionsContainer";
import KeyboardAndStartButton from "../console/KeyboardAndStartButton";
import Tail from "../console/Tail";
import { fetchConsoleInfo } from "../console/functions/fetchConsoleInfo";
import ReadWordButton from "../console/ReadWordButton";
import StatsContainer from "../console/StatsContainer";
import InnerTabContainer from "../components/containers/InnerTabContainer";
import { getAuthState } from "../store/auth";
import UseEffects from "../console/UseEffects";
import { getSettingsState } from "../store/settings";
import appTextSource from "../utils/appTextSource";
import {
  getFromAsyncStorage,
  saveToAsyncStorage,
} from "../utils/asyncStorage";
import AppModal from "../ui/AppModal";
import { errorHandler } from "../errors/errorHandler";

const Console = ({ navigation }) => {
  const inputFieldRef = useRef(null);
  const { refresh } = useSelector(getAuthState);
  const { appLang } = useSelector(getSettingsState);
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] =
    useState(false);

  const [isKeyboardVisible, setIsKeyboardVisible] =
    useState(false);

  const showWelcome = async () => {
    try {
      const firstTime =
        (await getFromAsyncStorage("first-time")) || "yes";

      if (firstTime !== "no") {
        setIsModalVisible(true);
        await saveToAsyncStorage("first-time", "no");
      }
    } catch (error) {
      errorHandler(error, dispatch);
    }
  };

  useEffect(() => {
    const fetchInfo = () => fetchConsoleInfo({ dispatch });
    const unsubscribe = navigation.addListener(
      "focus",
      fetchInfo,
    );

    fetchInfo();
    showWelcome();
    return unsubscribe;
  }, [navigation, refresh]);

  const help = () => {
    navigation.navigate("HelpScreen");
  };

  const { heading } = appTextSource[appLang].console;

  return (
    <InnerTabContainer {...{ heading, help }}>
      <StatsContainer />
      <OptionsContainer />
      <ReadWordButton />
      <InputAndTimerContainer
        {...{
          inputFieldRef: inputFieldRef,
          setIsKeyboardVisible,
        }}
      />
      <Tail />
      <KeyboardAndStartButton
        {...{
          inputFieldRef: inputFieldRef,
          isKeyboardVisible,
        }}
      />
      <UseEffects />
      <AppModal
        {...{
          isVisible: isModalVisible,
          modalName: "welcome",
          videoId: appLang === "pt" ? "lfc3MTUbbWU" : false,
          onPress: () => setIsModalVisible(false),
          info: true,
        }}
      />
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
