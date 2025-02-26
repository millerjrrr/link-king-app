import TabScreenContainer from "@components/Containers/TabScreenContainer";
import OptionsMenuItem from "./components/OptionsMenuItem";
import { useNavigation } from "@react-navigation/native";
import ColorPickerMenuItem from "./components/ColorPickerMenuItem";
import ModalTypeMenuItem from "./components/ModalTypeMenuItem";
import appTextSource from "../../utils/appTextSource";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "./../../store/settings";
import usePopToTop from "@src/hooks/utilityHooks/usePopToTop";
import { Platform } from "react-native";
import { updateModals } from "@src/store/modals";

const Options = () => {
  usePopToTop();
  const navigation = useNavigation();
  const navigateTo = (pageName) => {
    navigation.navigate(pageName);
  };

  const dispatch = useDispatch();

  const { appLang } = useSelector(settingsState);
  const {
    heading,
    setDailyGoal,
    chooseDictionary,
    manageAccount,
    shareProgress,
    shareApp,
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
      <OptionsMenuItem
        {...{
          iconName: "share-variant",
          name: shareProgress,
          selected: true,
          onPress: () => navigateTo("Progress"),
        }}
      />
      <OptionsMenuItem
        {...{
          iconName: "qrcode-scan",
          name: shareApp,
          selected: true,
          onPress: () =>
            dispatch(
              updateModals({ modalShowing: "qrModal" }),
            ),
        }}
      />
      {Platform.OS !== "web" ? (
        <ModalTypeMenuItem optionName="leaveAReview" />
      ) : null}
      <ModalTypeMenuItem optionName="contactUs" />
      <ModalTypeMenuItem optionName="logOut" />
    </TabScreenContainer>
  );
};

export default Options;
