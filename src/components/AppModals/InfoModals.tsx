import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import { ModalText } from "./components/StyledCompontents";
import AppModal from "./AppModal";
import ModalButton from "./components/ModalButton";
import {
  modalState,
  updateModals,
} from "@src/store/modals";
import useColors from "@src/hooks/useColors";
import { ModalWithMessage } from "@src/types/Modals";

const InfoModals = () => {
  const { CONTRAST } = useColors();
  const { appLang } = useSelector(settingsState);
  const { modalShowing } = useSelector(modalState);

  const infoModals = [
    "collectionInfoModal",
    "missingTTSModal",
    "dailyGoalInfoModal",
  ];

  const name: ModalWithMessage = infoModals.includes(
    modalShowing,
  )
    ? (modalShowing as ModalWithMessage)
    : "collectionInfoModal";

  const { modalMessage, cancel } =
    appTextSource(appLang).modals[name];

  const dispatch = useDispatch();
  const close = () => {
    dispatch(updateModals({ modalShowing: "" }));
  };

  return (
    <AppModal name={name} important>
      <ModalText color={CONTRAST}>{modalMessage}</ModalText>
      <ModalButton
        title={cancel}
        size={20}
        onPress={close}
      />
    </AppModal>
  );
};

export default InfoModals;
