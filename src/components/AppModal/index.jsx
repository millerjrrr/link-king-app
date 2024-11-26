import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import Modal from "react-native-modal";
import appTextSource from "@src/utils/appTextSource";
import YoutubePlayer from "react-native-youtube-iframe";
import {
  ModalContainer,
  ModalText,
} from "./StyledCompontents";
import ModalButton from "./ModalButton";
import DefinitionInWebViewModal from "./DefinitionInWebViewModal";

const AppModal = ({
  isVisible,
  info,
  webView,
  modalName,
  videoId,
  variable,
  onBackdropPress,
  onPress,
}) => {
  const { colorScheme, golden, appLang } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].PRIMARY;

  const { title, modalMessage, modalMessage2, cancel } =
    appTextSource(appLang).modals[modalName || "welcome"];

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      backdropColor={"transparent"}
    >
      <ModalContainer
        backgroundColor={backgroundColor}
        color={color}
      >
        {videoId ? (
          <YoutubePlayer
            height={195}
            width={"100%"}
            play={true}
            videoId={videoId}
            webViewStyle={{
              margin: 10,
              marginTop: 15,
            }}
          />
        ) : null}

        {webView ? (
          <DefinitionInWebViewModal x={onBackdropPress} />
        ) : (
          <ModalText color={color}>
            {modalMessage +
              (variable ? variable + modalMessage2 : "")}
          </ModalText>
        )}

        {/* Modal Buttons */}

        {info ? null : (
          <ModalButton
            title={title}
            color={color}
            size={20}
            onPress={onPress}
          />
        )}
        {webView ? null : (
          <ModalButton
            title={cancel}
            color={color}
            size={info ? 20 : 15}
            onPress={info ? onPress : onBackdropPress}
          />
        )}
      </ModalContainer>
    </Modal>
  );
};

export default AppModal;
