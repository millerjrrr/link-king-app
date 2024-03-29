import InnerTabContainer from "../components/containers/InnerTabContainer";
import OptionsMenuItem from "../options/OptionsMenuItem";
import { useNavigation } from "@react-navigation/native";
import ColorPickerMenuItem from "../options/ColorPickerMenuItem";
import ModalTypeMenuItem from "../options/ModalTypeMenuItem";
import appTextSource from "../utils/appTextSource";
import { useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";

const Options = () => {
  const navigation = useNavigation();
  const navigateTo = (pageName) => {
    navigation.navigate(pageName);
  };

  const { appLang } = useSelector(getSettingsState);
  const { heading, setDailyGoal, voiceSelection } =
    appTextSource[appLang].options;

  return (
    <InnerTabContainer {...{ heading }}>
      <OptionsMenuItem
        {...{
          iconName: "target-variant",
          name: setDailyGoal.title,
          first: true,
          onPress: () => navigateTo("SetDailyGoalScreen"),
        }}
      />
      <OptionsMenuItem
        {...{
          iconName: "account-tie-voice",
          name: voiceSelection.title,
          onPress: () => navigateTo("VoiceSelectionScreen"),
        }}
      />
      <ColorPickerMenuItem />
      <ModalTypeMenuItem optionName="contactUs" />
      <ModalTypeMenuItem optionName="logOut" />
    </InnerTabContainer>
  );
};

export default Options;
