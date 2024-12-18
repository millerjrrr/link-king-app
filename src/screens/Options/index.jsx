import TabScreenContainer from "@components/Containers/TabScreenContainer";
import OptionsMenuItem from "./components/OptionsMenuItem";
import { useNavigation } from "@react-navigation/native";
import ColorPickerMenuItem from "./components/ColorPickerMenuItem";
import ModalTypeMenuItem from "./components/ModalTypeMenuItem";
import appTextSource from "../../utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "./../../store/settings";
import usePopToTop from "@src/hooks/usePopToTop";
import WebsiteQR from "./components/WebsiteQR";
import { Platform } from "react-native";

const Options = () => {
  usePopToTop();
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
    <TabScreenContainer heading={heading} noBook>
      <OptionsMenuItem
        {...{
          iconName: "target-variant",
          name: setDailyGoal.heading,
          selected: true,
          first: true,
          onPress: () => navigateTo("Set Daily Goals"),
        }}
      />
      <OptionsMenuItem
        {...{
          iconName: "book-open-variant",
          name: chooseDictionary.title,
          selected: true,
          onPress: () => navigateTo("Dictionary Selection"),
        }}
      />
      <ColorPickerMenuItem />
      <OptionsMenuItem
        {...{
          iconName: "account-cog-outline",
          name: manageAccount.title,
          selected: true,
          onPress: () => navigateTo("Manage Account:"),
        }}
      />
      {Platform.OS !== "web" ? (
        <ModalTypeMenuItem optionName="leaveAReview" />
      ) : null}
      <ModalTypeMenuItem optionName="contactUs" />
      <ModalTypeMenuItem optionName="logOut" />
      <WebsiteQR />
    </TabScreenContainer>
  );
};

export default Options;
