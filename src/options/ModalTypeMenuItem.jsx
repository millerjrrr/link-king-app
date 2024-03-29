import { Linking, StatusBar } from "react-native";
import colors from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  getSettingsState,
  updateSettings,
} from "../store/settings";
import { useState } from "react";
import OptionsMenuItemContainer from "./components/OptionsMenuItemContainer";
import { updateNotification } from "../store/notification";
import {
  updateLoggedInState,
  updateToken,
} from "../store/auth";
import { removeFromAsyncStorage } from "../utils/asyncStorage";
import appTextSource from "./../utils/appTextSource/index";
import AppModal from "../ui/AppModal";
import MenuItemLink from "./components/MenuItemLink";

const ModalTypeMenuItem = ({ optionName }) => {
  const { appLang } = useSelector(getSettingsState);

  const [isModalVisible, setIsModalVisible] =
    useState(false);

  const dispatch = useDispatch();

  const { subject: subjectText } =
    appTextSource[appLang].options.contactUs;

  const handleSendEmail = () => {
    const email = "info@linkoking.com";
    const subject = encodeURIComponent(subjectText);
    const url = `mailto:${email}?subject=${subject}`;

    Linking.openURL(url).catch((err) =>
      dispatch(
        updateNotification({
          message: err,
          type: "error",
        }),
      ),
    );
  };

  const logOut = async () => {
    dispatch(updateToken(""));
    dispatch(updateLoggedInState(false));
    dispatch(updateSettings({ colorScheme: "dark" }));
    removeFromAsyncStorage("auth-token");
    removeFromAsyncStorage("color-scheme");
    StatusBar.setBarStyle(colors.dark.STATUSBAR);
  };

  const { name } =
    appTextSource[appLang].options[optionName];

  switch (optionName) {
    case "contactUs":
      onPress = handleSendEmail;
      iconName = "email-outline";
      break;
    case "logOut":
      onPress = logOut;
      iconName = "logout";
      break;
  }

  return (
    <OptionsMenuItemContainer {...{ iconName }}>
      <MenuItemLink
        {...{
          name,
          onPress: () => setIsModalVisible(true),
        }}
      />
      <AppModal
        {...{
          isVisible: isModalVisible,
          onBackdropPress: () => setIsModalVisible(false),
          modalName: optionName,
          onPress,
        }}
      />
    </OptionsMenuItemContainer>
  );
};

export default ModalTypeMenuItem;
