import InputAndTimerContainer from "../console/InputAndTimerContainer";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OptionsContainer from "../console/OptionsContainer";
import KeyboardAndStartButton from "../console/KeyboardAndStartButton";
import Tail from "../console/Tail";
import ReadWordButton from "../console/ReadWordButton";
import StatsContainer from "../console/StatsContainer";
import InnerTabContainer from "../components/containers/InnerTabContainer";
import UseEffects from "../console/UseEffects";
import { getSettingsState } from "../store/settings";
import appTextSource from "../utils/appTextSource";
import AppModal from "../ui/AppModal";
import { getAuthState, refreshPage } from "../store/auth";

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

  const help = () => {
    navigation.navigate("HelpScreen");
  };

  const { heading } = appTextSource(appLang).console;

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
      <Tail {...{ setIsKeyboardVisible }} />
      <KeyboardAndStartButton
        {...{
          inputFieldRef: inputFieldRef,
          isKeyboardVisible,
        }}
      />
      <UseEffects
        {...{
          setIsModalVisible,
          setIsModalVisible2,
        }}
      />
      <AppModal
        {...{
          isVisible: isModalVisible,
          modalName: "welcome",
          videoId: appLang === "pt" ? "lfc3MTUbbWU" : false,
          onPress: () => {
            setIsModalVisible(false);
            dispatch(refreshPage());
            setIsModalVisible2(true);
          },
          info: true,
        }}
      />
      <AppModal
        {...{
          isVisible: isModalVisible2,
          modalName: "trialNotice",
          variable: trialDays,
          onPress: () => setIsModalVisible2(false),
          info: true,
        }}
      />
    </InnerTabContainer>
  );
};

export default Console;
