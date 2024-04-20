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
  const {
    heading,
    setDailyGoal,
    voiceSelection,
    chooseDictionary,
  } = appTextSource[appLang].options;

  return (
    <InnerTabContainer {...{ heading, noBook: true }}>
      <OptionsMenuItem
        {...{
          iconName: "target-variant",
          name: setDailyGoal.heading,
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
      <OptionsMenuItem
        {...{
          iconName: "book-open-variant",
          name: chooseDictionary.title,
          onPress: () =>
            navigateTo("DictionarySelectionScreen"),
        }}
      />
      <ColorPickerMenuItem />
      <ModalTypeMenuItem optionName="contactUs" />
      <ModalTypeMenuItem optionName="logOut" />
    </InnerTabContainer>
  );
};

export default Options;
