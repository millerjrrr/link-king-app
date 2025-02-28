import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import Modal from "react-native-modal";
import { ModalContainer } from "./components/StyledCompontents";
import {
  modalState,
  updateModals,
} from "@src/store/modals";
import { Modal as ModalType } from "@src/types/Modals";
import { ReactNode } from "react";
import Xbar from "./components/XBar";
import useColors from "@src/hooks/utilityHooks/useColors";
import AppLink from "../AppLink";
import { Linking, TouchableOpacity } from "react-native";
import appTextSource from "@src/utils/appTextSource";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

interface Props {
  name: ModalType;
  important?: boolean;
  webViewUrl?: string;
  children: ReactNode;
}

const AppModal: React.FC<Props> = ({
  name,
  important,
  children,
  webViewUrl,
}) => {
  const { CONTRAST, PRIMARY } = useColors();
  const { appLang } = useSelector(settingsState);
  const { openInBrowser } = appTextSource(appLang).paywall;

  const dispatch = useDispatch();
  const { modalShowing } = useSelector(modalState);

  const close = () => {
    dispatch(updateModals({ modalShowing: "" }));
  };

  const openWebViewUrl = () => {
    if (webViewUrl) Linking.openURL(webViewUrl);
  };

  return (
    <Modal
      isVisible={name === modalShowing}
      onBackdropPress={!important ? close : () => void 0}
      backdropColor={"transparent"}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ModalContainer
        backgroundColor={PRIMARY}
        color={CONTRAST}
      >
        <Xbar x={close} />
        {children}
        {webViewUrl && (
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 7,
              top: 7,
            }}
            onPress={openWebViewUrl}
          >
            <SimpleLineIcons
              name="size-fullscreen"
              size={20}
              color={CONTRAST}
            />
          </TouchableOpacity>
        )}
        {webViewUrl && (
          <AppLink
            title={openInBrowser}
            onPress={openWebViewUrl}
          />
        )}
      </ModalContainer>
    </Modal>
  );
};

export default AppModal;
