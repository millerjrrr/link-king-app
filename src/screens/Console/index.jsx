import InputAndTimerContainer from "./components/InputAndTimerContainer";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OptionsContainer from "./components/OptionsContainer";
import KeyboardAndStartButton from "./components/KeyboardAndStartButton";
import Tail from "./components/Tail";
import ReadWordButton from "./components/ReadWordButton";
import StatsContainer from "./components/StatsContainer";
import TabScreenContainer from "@src/components/Containers/TabScreenContainer";
import {
  incHelpPulsing,
  settingsState,
} from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import useManageGolden from "@src/hooks/consoleHooks/useEffects/useManageGolden";
import useTimeManager from "@src/hooks/consoleHooks/useEffects/useTimeManager";
import useConsoleUpdates from "@src/hooks/consoleHooks/useEffects/useConsoleUpdates";
import useOnKeyboardClose from "@src/hooks/consoleHooks/useEffects/useOnKeyboardClose";
import useHandleAppBackgroundExit from "../../hooks/consoleHooks/useEffects/useHandleAppBackgroundExit";
import useUpdateOptions from "@src/hooks/consoleHooks/useEffects/useUpdateOptions";
import usePopToTop from "@src/hooks/utilityHooks/usePopToTop";
import IsSubscribedWrapper from "./components/IsSubscribedWrapper";
import BackMusicButton from "./components/BackMusicButton";

const Console = ({ navigation }) => {
  const inputFieldRef = useRef(null);
  const { appLang } = useSelector(settingsState);

  const [isKeyboardVisible, setIsKeyboardVisible] =
    useState(false);

  const navigateToHelp = () => {
    navigation.navigate("Console - Help");
  };

  const { heading } = appTextSource(appLang).console;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isKeyboardVisible) dispatch(incHelpPulsing());
  }, [isKeyboardVisible]);

  // Hook calls
  useManageGolden();
  useTimeManager();
  useConsoleUpdates();
  useHandleAppBackgroundExit();
  useOnKeyboardClose();
  useUpdateOptions();

  usePopToTop();

  return (
    <IsSubscribedWrapper>
      <TabScreenContainer
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
        <BackMusicButton />
      </TabScreenContainer>
    </IsSubscribedWrapper>
  );
};

export default Console;
