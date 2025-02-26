import colors from "@src/utils/colors";
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
import { Linking } from "react-native";
import appTextSource from "@src/utils/appTextSource";

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
        {webViewUrl ? (
          <AppLink
            title={openInBrowser}
            onPress={() => {
              if (webViewUrl) Linking.openURL(webViewUrl);
            }}
          />
        ) : null}
      </ModalContainer>
    </Modal>
  );
};

export default AppModal;
