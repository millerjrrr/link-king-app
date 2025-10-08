import InputAndTimerContainer from "./components/InputAndTimerContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OptionsContainer from "./components/OptionsContainer";
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
import useConsoleUpdates from "@src/hooks/consoleHooks/useEffects/useConsoleUpdates";
import useOnKeyboardClose from "@src/hooks/consoleHooks/useEffects/useOnKeyboardClose";
import useHandleAppBackgroundExit from "../../hooks/consoleHooks/useEffects/useHandleAppBackgroundExit";
import useUpdateOptions from "@src/hooks/consoleHooks/useEffects/useUpdateOptions";
import usePopToTop from "@src/hooks/utilityHooks/usePopToTop";
// import IsSubscribedWrapper from "./components/IsSubscribedWrapper";
import UserPromptAndMusicButton from "./components/UserPromptAndMusicButton";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ConsoleStackParamList } from "@src/types/navigationTypes";
import IntegratedSolutionsList from "./components/IntegratedSolutionsList";

const Console = () => {
  const { appLang } = useSelector(settingsState);

  const [isKeyboardVisible, setIsKeyboardVisible] =
    useState(false);

  const navigation =
    useNavigation<
      StackNavigationProp<ConsoleStackParamList>
    >();
  const navigateToHelp = () => {
    navigation.navigate("Console - Help");
  };

  const { heading } = appTextSource(appLang).console;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isKeyboardVisible) dispatch(incHelpPulsing());
  }, [isKeyboardVisible]);

  // Effects
  // useManageGolden(); not currently using
  useConsoleUpdates();
  useHandleAppBackgroundExit();
  useOnKeyboardClose();
  useUpdateOptions();

  usePopToTop();

  return (
    // <IsSubscribedWrapper>
    <TabScreenContainer
      heading={heading}
      help={navigateToHelp}
      helpAnimated
    >
      <IntegratedSolutionsList />
      <StatsContainer />
      <OptionsContainer />
      <ReadWordButton />
      <InputAndTimerContainer
        setIsKeyboardVisible={setIsKeyboardVisible}
      />
      <Tail />
      <UserPromptAndMusicButton
        isKeyboardVisible={isKeyboardVisible}
      />
    </TabScreenContainer>
    // </IsSubscribedWrapper>
  );
};

export default Console;
