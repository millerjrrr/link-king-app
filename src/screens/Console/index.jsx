import InputAndTimerContainer from "./components/InputAndTimerContainer";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OptionsContainer from "./components/OptionsContainer";
import KeyboardAndStartButton from "./components/KeyboardAndStartButton";
import Tail from "./components/Tail";
import ReadWordButton from "./components/ReadWordButton";
import StatsContainer from "./components/StatsContainer";
import InnerTabContainer from "@src/components/containers/InnerTabContainer";
import { getSettingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppModal from "@src/components/AppModal";
import { getAuthState, refreshPage } from "@src/store/auth";
import useManageGolden from "@src/hooks/consoleHooks/useManageGolden";
import useTimeManager from "@src/hooks/consoleHooks/useTimeManager";
import useConsoleUpdates from "@src/hooks/consoleHooks/useConsoleUpdates";
import useManageModals from "@src/hooks/consoleHooks/useManageModals";
import useOnKeyboardClose from "@src/hooks/consoleHooks/useOnKeyboardClose";
import useHandleAppBackgroundExit from "../../hooks/consoleHooks/useHandleAppBackgroundExit";

const Console = ({ navigation }) => {
  const dispatch = useDispatch();

  const inputFieldRef = useRef(null);
  const { appLang } = useSelector(getSettingsState);
  const { trialDays } = useSelector(getAuthState);

  const [isModalVisible, setIsModalVisible] =
    useState(false);
  const [isModalVisible2, setIsModalVisible2] =
    useState(false);

  const [isKeyboardVisible, setIsKeyboardVisible] =
    useState(false);

  const navigateToHelp = () => {
    navigation.navigate("HelpScreen");
  };

  const { heading } = appTextSource(appLang).console;

  // Hook calls
  useManageGolden();
  useTimeManager();
  useConsoleUpdates();
  useManageModals(setIsModalVisible, setIsModalVisible2);
  useHandleAppBackgroundExit();
  useOnKeyboardClose();

  const modals = [
    {
      isVisible: isModalVisible,
      modalName: "welcome",
      videoId: appLang === "pt" ? "lfc3MTUbbWU" : false,
      onPress: () => {
        setIsModalVisible(false);
        dispatch(refreshPage());
        setIsModalVisible2(true);
      },
      info: true,
    },
    {
      isVisible: isModalVisible2,
      modalName: "trialNotice",
      variable: trialDays,
      onPress: () => setIsModalVisible2(false),
      info: true,
    },
  ];

  return (
    <InnerTabContainer
      heading={heading}
      help={navigateToHelp}
    >
      <StatsContainer />
      <OptionsContainer />
      <ReadWordButton />
      <InputAndTimerContainer
        inputFieldRef={inputFieldRef}
        setIsKeyboardVisible={setIsKeyboardVisible}
      />
      <Tail setIsKeyboardVisible={setIsKeyboardVisible} />
      <KeyboardAndStartButton
        inputFieldRef={inputFieldRef}
        isKeyboardVisible={setIsKeyboardVisible}
      />
      {modals.map((modalProps, index) => (
        <AppModal key={index} {...modalProps} />
      ))}
    </InnerTabContainer>
  );
};

export default Console;
