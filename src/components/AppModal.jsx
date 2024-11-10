import {
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import styled from "styled-components";
import Modal from "react-native-modal";
import appTextSource from "@src/utils/appTextSource";
import YoutubePlayer from "react-native-youtube-iframe";
import AppText from "./AppText";
import { appShadowForStyledComponents } from "@src/utils/appShadow";

const ModalContainer = styled(View)`
  padding-horizontal: 5px;
  border-radius: 10px;
  align-items: center;
  background-color: ${(props) => props.backgroundColor};
  shadow-color: ${(props) => props.color};
  ${appShadowForStyledComponents}
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
  border-top-width: ${Platform.OS === "android"
    ? 0.5
    : 0.2}px;
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
  const { colorScheme, golden, appLang } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].PRIMARY;

  const { title, modalMessage, modalMessage2, cancel } =
    appTextSource(appLang).modals[modalName];

  return (
    <Modal
      {...{
        isVisible,
        onBackdropPress,
        backdropColor: "transparent",
      }}
    >
      <ModalContainer
        {...{
          backgroundColor,
          color,
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
