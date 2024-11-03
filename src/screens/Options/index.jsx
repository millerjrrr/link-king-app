import InnerTabContainer from "./../../components/containers/InnerTabContainer";
import OptionsMenuItem from "./components/OptionsMenuItem";
import { useNavigation } from "@react-navigation/native";
import ColorPickerMenuItem from "./components/ColorPickerMenuItem";
import ModalTypeMenuItem from "./components/ModalTypeMenuItem";
import appTextSource from "../../utils/appTextSource";
import { useSelector } from "react-redux";
import { getSettingsState } from "./../../store/settings";

const Options = () => {
  const navigation = useNavigation();
  const navigateTo = (pageName) => {
    navigation.navigate(pageName);
  };

  const { appLang } = useSelector(getSettingsState);
  const {
    heading,
    setDailyGoal,
    chooseDictionary,
    manageAccount,
  } = appTextSource(appLang).options;

  return (
    <InnerTabContainer
      {...{ heading, noBook: true, back: true }}
    >
      <OptionsMenuItem
        {...{
          iconName: "target-variant",
          name: setDailyGoal.heading,
          selected: true,
          first: true,
          onPress: () => navigateTo("SetDailyGoalScreen"),
        }}
      />
      {/* <OptionsMenuItem
        {...{
          iconName: "account-tie-voice",
          name: voiceSelection.title,
          onPress: () => navigateTo("VoiceSelectionScreen"),
        }}
      /> */}
      <OptionsMenuItem
        {...{
          iconName: "book-open-variant",
          name: chooseDictionary.title,
          selected: true,
          onPress: () =>
            navigateTo("DictionarySelectionScreen"),
        }}
      />
      <ColorPickerMenuItem />
      <OptionsMenuItem
        {...{
          iconName: "account-cog-outline",
          name: manageAccount.title,
          selected: true,
          onPress: () =>
            navigateTo("ManageAccountNavigator"),
        }}
      />
      <ModalTypeMenuItem optionName="contactUs" />
      <ModalTypeMenuItem optionName="logOut" />
    </InnerTabContainer>
  );
};

export default Options;
