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
import { authState } from "@src/store/auth";
import useColors from "@src/hooks/useColors";
import { ModalWithMessage } from "@src/types/Modals";

const InfoModals = () => {
  const { CONTRAST } = useColors();
  const { appLang } = useSelector(settingsState);
  const { modalShowing } = useSelector(modalState);

  const infoModals = [
    "welcomeModal",
    "trialNoticeModal",
    "collectionInfoModal",
    "missingTTSModal",
    "dailyGoalInfoModal",
  ];

  const name: ModalWithMessage = infoModals.includes(
    modalShowing,
  )
    ? (modalShowing as ModalWithMessage)
    : "welcomeModal";

  const { modalMessage, modalMessage2, cancel } =
    appTextSource(appLang).modals[name];

  const dispatch = useDispatch();
  const close = () => {
    dispatch(
      updateModals({
        modalShowing:
          name === "welcomeModal" ? "trialNoticeModal" : "",
      }),
    );
  };

  const { trialDays } = useSelector(authState);

  const message: string =
    name === "trialNoticeModal" && modalMessage2
      ? `${trialDays} ${modalMessage2}`
      : modalMessage;

  return (
    <AppModal name={name} important>
      <ModalText color={CONTRAST}>{message}</ModalText>
      <ModalButton
        title={cancel}
        size={20}
        onPress={close}
      />
    </AppModal>
  );
};

export default InfoModals;
