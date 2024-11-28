import colors from "@src/utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import Modal from "react-native-modal";
import { ModalContainer } from "./StyledCompontents";
import {
  modalState,
  updateModals,
} from "@src/store/modals";
import { Modal as ModalType } from "@src/types/Modals";
import { ReactNode } from "react";
import Xbar from "./components/XBar";

const AppModal = ({
  name,
  important,
  children,
}: {
  name: ModalType;
  important?: boolean;
  children: ReactNode;
}) => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const { CONTRAST, PRIMARY } = colors[colorScheme];

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
    >
      <ModalContainer
        backgroundColor={PRIMARY}
        color={CONTRAST[golden]}
      >
        <Xbar x={close} />
        {children}
      </ModalContainer>
    </Modal>
  );
};

export default AppModal;
