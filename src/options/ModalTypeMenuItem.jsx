import { Linking, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";
import { useState } from "react";
import OptionsMenuItemContainer from "./components/OptionsMenuItemContainer";
import { updateNotification } from "../store/notification";
import appTextSource from "./../utils/appTextSource/index";
import AppModal from "../ui/AppModal";
import MenuItemLink from "./components/MenuItemLink";
import logOut from "../utils/logOut";

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

    setIsModalVisible(false);

    Linking.openURL(url).catch((err) =>
      dispatch(
        updateNotification({
          message: err,
          type: "error",
        }),
      ),
    );
  };

  const logOutNow = async () => {
    logOut(dispatch);
    setIsModalVisible(false);
  };

  const { name } =
    appTextSource[appLang].options[optionName];

  switch (optionName) {
    case "contactUs":
      onPress = handleSendEmail;
      iconName = "email-outline";
      break;
    case "logOut":
      onPress = logOutNow;
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
