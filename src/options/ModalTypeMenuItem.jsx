import {
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";
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
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].PRIMARY;

  const [isModalVisible, setIsModalVisible] =
    useState(false);

  const dispatch = useDispatch();

  const handleSendEmail = () => {
    const email = "info@linkoking.com";
    const subject = encodeURIComponent("General Inquiry");
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
    removeFromAsyncStorage("auth-token");
  };

  let onPress, textA, textB, title, iconName;

  switch (optionName) {
    case "Contact Us":
      onPress = handleSendEmail;
      iconName = "email-outline";
      textA = "Contact Us";
      textB =
        "Please contact us by email and we will get back " +
        "to you as soon as possible.";
      title = "Send Email";
      break;
    case "Log Out":
      onPress = logOut;
      iconName = "logout";
      textA = "Log Out";
      textB = "Are your sure you want to log out?";
      title = "Log Out";
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
          {textA}
        </Text>
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
      >
        <ModalContainer {...{ backgroundColor }}>
          <ModalText {...{ color }}>{textB}</ModalText>
          <Button
            {...{
              title,
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
