import { Text, TouchableOpacity, View } from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";
import styled from "styled-components";
import Modal from "react-native-modal";
import appTextSource from "./../utils/appTextSource/index";

const ModalContainer = styled(View)`
  background-color: ${(props) => props.backgroundColor};
  padding-horizontal: 5px;
  border-radius: 10px;
  align-items: center;
`;
const ModalText = styled(Text)`
  font-size: 25px;
  margin: 20px;
  text-align: center;
  color: ${(props) => props.color};
`;

const ButtonText = styled(Text)`
  margin: 15px;
  text-align: center;
  font-size: ${(props) => props.size}px;
  color: ${(props) => props.color};
`;

const ButtonContainer = styled(TouchableOpacity)`
  width: 100%;
  border-top-color: ${(props) => props.color};
  border-top-width: 0.2px;
`;

const Button = ({ title, color, size, onPress }) => {
  return (
    <ButtonContainer {...{ onPress, color }}>
      <ButtonText {...{ color, size }}>{title}</ButtonText>
    </ButtonContainer>
  );
};

const AppModal = ({
  isVisible,
  onBackdropPress,
  modalName,
  onPress,
}) => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].PRIMARY;

  const { title, modalMessage } =
    appTextSource[appLang].modals[modalName];

  return (
    <Modal {...{ isVisible, onBackdropPress }}>
      <ModalContainer {...{ backgroundColor }}>
        <ModalText {...{ color }}>{modalMessage}</ModalText>
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
            onPress: onBackdropPress,
          }}
        />
      </ModalContainer>
    </Modal>
  );
};

export default AppModal;
