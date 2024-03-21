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

const ContactDetailsMenuItem = () => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].PRIMARY;

  const [isModalVisible, setIsModalVisible] =
    useState(false);

  const dispatch = useDispatch();

  const handleSendEmail = () => {
    // Define the email address, subject, and body
    const email = "info@linkoking.com";
    const subject = encodeURIComponent("General Inquiry");

    // Create the URL
    const url = `mailto:${email}?subject=${subject}`;

    // Use Linking API to open the email client
    Linking.openURL(url).catch((err) =>
      dispatch(
        updateNotification({
          message: err,
          type: "error",
        }),
      ),
    );
  };

  return (
    <OptionsMenuItemContainer {...{ iconName: "contacts" }}>
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "center" }}
        onPress={() => setIsModalVisible(true)}
      >
        <Text
          style={{
            color,
            fontSize: 20,
          }}
        >
          Contact Us
        </Text>
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
      >
        <ModalContainer {...{ backgroundColor }}>
          <ModalText {...{ color }}>
            Please contact us by email and we will get back
            to you as soon as possible.
          </ModalText>
          <Button
            {...{
              title: "Send Email",
              color,
              size: 20,
              onPress: handleSendEmail,
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

export default ContactDetailsMenuItem;
