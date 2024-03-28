import {
  Linking,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  getSettingsState,
  updateSettings,
} from "../store/settings";
import styled from "styled-components";
import { useState } from "react";
import Modal from "react-native-modal";
import OptionsMenuItemContainer from "./components/OptionsMenuItemContainer";
import { updateNotification } from "../store/notification";
import {
  updateLoggedInState,
  updateToken,
} from "../store/auth";
import { removeFromAsyncStorage } from "../utils/asyncStorage";
import appTextSource from "./../utils/appTextSource/index";

const ModalContainer = styled(View)`
  background-color: ${(props) => props.backgroundColor};
  padding: 20px;
  border-radius: 10px;
  align-items: center;
`;
const ModalText = styled(Text)`
  margin-bottom: 20px;
  text-align: center;
  color: ${(props) => props.color};
`;

const ButtonText = styled(Text)`
  margin: 10px;
  text-align: center;
  font-size: ${(props) => props.size}px;
  color: ${(props) => props.color};
`;

const Button = ({ title, color, size, onPress }) => {
  return (
    <TouchableOpacity {...{ onPress }}>
      <ButtonText {...{ color, size }}>{title}</ButtonText>
    </TouchableOpacity>
  );
};

const ModalTypeMenuItem = ({ optionName }) => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].PRIMARY;

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

  const { title, modalMessage, button } =
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
      <TouchableOpacity
        {...{
          style: { flex: 1, justifyContent: "center" },
          onPress: () => setIsModalVisible(true),
        }}
      >
        <Text
          {...{
            style: {
              color,
              fontSize: 20,
            },
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
      >
        <ModalContainer {...{ backgroundColor }}>
          <ModalText {...{ color }}>
            {modalMessage}
          </ModalText>
          <Button
            {...{
              title: button,
              color,
              size: 20,
              onPress,
            }}
          />
          <Button
            {...{
              title: "Cancel",
              color,
              size: 15,
              onPress: () => setIsModalVisible(false),
            }}
          />
        </ModalContainer>
      </Modal>
    </OptionsMenuItemContainer>
  );
};

export default ModalTypeMenuItem;
