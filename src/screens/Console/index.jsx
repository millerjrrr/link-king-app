import InputAndTimerContainer from "./components/InputAndTimerContainer";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OptionsContainer from "./components/OptionsContainer";
import KeyboardAndStartButton from "./components/KeyboardAndStartButton";
import Tail from "./components/Tail";
import ReadWordButton from "./components/ReadWordButton";
import StatsContainer from "./components/StatsContainer";
import InnerTabContainer from "@src/components/containers/InnerTabContainer";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppModal from "@src/components/AppModal";
import { authState, refreshPage } from "@src/store/auth";
import useManageGolden from "@src/hooks/consoleHooks/useEffects/useManageGolden";
import useTimeManager from "@src/hooks/consoleHooks/useEffects/useTimeManager";
import useConsoleUpdates from "@src/hooks/consoleHooks/useEffects/useConsoleUpdates";
import useManageModals from "@src/hooks/consoleHooks/useEffects/useManageModals";
import useOnKeyboardClose from "@src/hooks/consoleHooks/useEffects/useOnKeyboardClose";
import useHandleAppBackgroundExit from "../../hooks/consoleHooks/useEffects/useHandleAppBackgroundExit";

const Console = ({ navigation }) => {
  const dispatch = useDispatch();

  const inputFieldRef = useRef(null);
  const { appLang } = useSelector(settingsState);
  const { trialDays } = useSelector(authState);

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
        isKeyboardVisible={isKeyboardVisible}
      />
      {modals.map((modalProps, index) => (
        <AppModal key={index} {...modalProps} />
      ))}
    </InnerTabContainer>
  );
};

export default Console;
