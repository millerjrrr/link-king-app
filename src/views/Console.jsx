import InputAndTimerContainer from "../console/InputAndTimerContainer";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
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
import { getAuthState } from "../store/auth";

const Console = ({ navigation }) => {
  const inputFieldRef = useRef(null);
  const { appLang } = useSelector(getSettingsState);
  const { trialDays, refresh } = useSelector(getAuthState);

  const [isModalVisible, setIsModalVisible] =
    useState(false);

  const [isModalVisible2, setIsModalVisible2] = useState(
    trialDays >= 0 && refresh === 0,
  );

  const [isKeyboardVisible, setIsKeyboardVisible] =
    useState(false);

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
      <Tail {...{ setIsKeyboardVisible }} />
      <KeyboardAndStartButton
        {...{
          inputFieldRef: inputFieldRef,
          isKeyboardVisible,
        }}
      />
      <UseEffects {...{ setIsModalVisible }} />
      <AppModal
        {...{
          isVisible: isModalVisible,
          modalName: "welcome",
          videoId: appLang === "pt" ? "lfc3MTUbbWU" : false,
          onPress: () => setIsModalVisible(false),
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
