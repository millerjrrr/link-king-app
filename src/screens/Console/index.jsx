import InputAndTimerContainer from "./components/InputAndTimerContainer";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OptionsContainer from "./components/OptionsContainer";
import KeyboardAndStartButton from "./components/KeyboardAndStartButton";
import Tail from "./components/Tail";
import ReadWordButton from "./components/ReadWordButton";
import StatsContainer from "./components/StatsContainer";
import InnerTabContainer from "@src/components/Containers/InnerTabContainer";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppModal from "@src/components/AppModal";
import { authState } from "@src/store/auth";
import useManageGolden from "@src/hooks/consoleHooks/useEffects/useManageGolden";
import useTimeManager from "@src/hooks/consoleHooks/useEffects/useTimeManager";
import useConsoleUpdates from "@src/hooks/consoleHooks/useEffects/useConsoleUpdates";
import useManageModals from "@src/hooks/consoleHooks/useEffects/useManageModals";
import useOnKeyboardClose from "@src/hooks/consoleHooks/useEffects/useOnKeyboardClose";
import useHandleAppBackgroundExit from "../../hooks/consoleHooks/useEffects/useHandleAppBackgroundExit";
import useUpdateOptions from "@src/hooks/consoleHooks/useEffects/useUpdateOptions";
import {
  modalState,
  updateModals,
} from "@src/store/modals";

const Console = ({ navigation }) => {
  const inputFieldRef = useRef(null);
  const { appLang } = useSelector(settingsState);
  const { trialDays } = useSelector(authState);
  const { showWelcomeModal, showTrialNoticeModal } =
    useSelector(modalState);

  const dispatch = useDispatch();

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
  useManageModals();
  useHandleAppBackgroundExit();
  useOnKeyboardClose();
  useUpdateOptions();

  const modals = [
    {
      isVisible: showWelcomeModal,
      modalName: "welcome",
      videoId: appLang === "pt" ? "lfc3MTUbbWU" : false,
      onPress: () => {
        dispatch(
          updateModals({
            showWelcomeModal: false,
            showTrialNoticeModal: true,
          }),
        );
      },
      info: true,
    },
    {
      isVisible: showTrialNoticeModal,
      modalName: "trialNotice",
      variable: trialDays,
      onPress: () =>
        dispatch(
          updateModals({ showTrialNoticeModal: false }),
        ),
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
