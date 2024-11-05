import { Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import OptionsMenuItemContainer from "./OptionsMenuItemContainer";
import { updateNotification } from "@src/store/notification";
import appTextSource from "@src/utils/appTextSource";
import AppModal from "@src/components/AppModal";
import MenuItemLink from "./MenuItemLink";
import { settingsState } from "@src/store/settings";
import useLogOut from "@src/hooks/authHooks/useLogOut";

const ModalTypeMenuItem = ({ optionName }) => {
  const { appLang } = useSelector(settingsState);

  const [isModalVisible, setIsModalVisible] =
    useState(false);

  const dispatch = useDispatch();
  const logOut = useLogOut();

  const { subject: subjectText } =
    appTextSource(appLang).options.contactUs;

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
    await logOut();
    setIsModalVisible(false);
  };

  const { name } =
    appTextSource(appLang).options[optionName];

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
