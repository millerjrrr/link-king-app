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
import WebsiteQR from "@src/screens/Options/components/WebsiteQR";

const InfoModals = () => {
  const { CONTRAST } = useColors();
  const { appLang } = useSelector(settingsState);
  const { modalShowing } = useSelector(modalState);

  const infoModals = [
    "collectionInfoModal",
    "missingTTSModal",
    "dailyGoalInfoModal",
    "qrModal",
  ];

  const name: ModalWithMessage | "qrModal" =
    infoModals.includes(modalShowing)
      ? (modalShowing as ModalWithMessage | "qrModal")
      : "qrModal";

  const { modalMessage, cancel } =
    name !== "qrModal"
      ? appTextSource(appLang).modals[name]
      : appTextSource(appLang).modals["dailyGoalInfoModal"];

  const dispatch = useDispatch();
  const close = () => {
    dispatch(updateModals({ modalShowing: "" }));
  };

  return (
    <AppModal name={name} important>
      {modalShowing === "qrModal" ? (
        <WebsiteQR />
      ) : (
        <ModalText color={CONTRAST}>
          {modalMessage}
        </ModalText>
      )}
      <ModalButton
        title={cancel}
        size={20}
        onPress={close}
      />
    </AppModal>
  );
};

export default InfoModals;
