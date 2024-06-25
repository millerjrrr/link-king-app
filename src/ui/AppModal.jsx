import { TouchableOpacity, View } from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";
import styled from "styled-components";
import Modal from "react-native-modal";
import appTextSource from "./../utils/appTextSource/index";
import appShadow from "./../utils/appShadow";
import YoutubePlayer from "react-native-youtube-iframe";
import AppText from "./AppText";

const ModalContainer = styled(View)`
  background-color: ${(props) => props.backgroundColor};
  shadow-color: ${(props) => props.color};
  border-color: ${(props) => props.color};
  padding-horizontal: 5px;
  border-radius: 10px;
  align-items: center;
`;
const ModalText = styled(AppText)`
  margin: 20px;
  color: ${(props) => props.color};
`;

const ButtonText = styled(AppText)`
  margin: 15px;
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
  videoId,
  info,
  variable,
}) => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].PRIMARY;

  const { title, modalMessage, modalMessage2, cancel } =
    appTextSource[appLang].modals[modalName];

  return (
    <Modal {...{ isVisible, onBackdropPress }}>
      <ModalContainer
        {...{
          backgroundColor,
          color,
          style: {
            ...appShadow(1),
          },
        }}
      >
        {videoId ? (
          <YoutubePlayer
            {...{
              height: 195,
              width: "100%",
              play: true,
              videoId,
              webViewStyle: {
                margin: 10,
                marginTop: 15,
              },
            }}
          />
        ) : null}
        <ModalText {...{ color }}>
          {modalMessage +
            (variable ? variable + modalMessage2 : "")}
        </ModalText>
        {info ? (
          <Button
            {...{
              title: cancel,
              color,
              size: 20,
              onPress,
            }}
          />
        ) : (
          <>
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
                title: cancel,
                color,
                size: 15,
                onPress: onBackdropPress,
              }}
            />
          </>
        )}
      </ModalContainer>
    </Modal>
  );
};

export default AppModal;
