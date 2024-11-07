import InnerTabContainer from "../../components/Containers/InnerTabContainer";
import OptionsMenuItem from "./components/OptionsMenuItem";
import { useNavigation } from "@react-navigation/native";
import ColorPickerMenuItem from "./components/ColorPickerMenuItem";
import ModalTypeMenuItem from "./components/ModalTypeMenuItem";
import appTextSource from "../../utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "./../../store/settings";

const Options = () => {
  const navigation = useNavigation();
  const navigateTo = (pageName) => {
    navigation.navigate(pageName);
  };

  const { appLang } = useSelector(settingsState);
  const {
    heading,
    setDailyGoal,
    chooseDictionary,
    manageAccount,
  } = appTextSource(appLang).options;

  return (
    <InnerTabContainer heading={heading} noBook={true}>
      <OptionsMenuItem
        {...{
          iconName: "target-variant",
          name: setDailyGoal.heading,
          selected: true,
          first: true,
          onPress: () => navigateTo("SetDailyGoalScreen"),
        }}
      />
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
          onPress: () => navigateTo("ManageAccount"),
        }}
      />
      <ModalTypeMenuItem optionName="contactUs" />
      <ModalTypeMenuItem optionName="logOut" />
    </InnerTabContainer>
  );
};

export default Options;
