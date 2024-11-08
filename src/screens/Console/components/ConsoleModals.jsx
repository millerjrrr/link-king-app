import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import AppModal from "@src/components/AppModal";
import { authState } from "@src/store/auth";
import {
  modalState,
  updateModals,
} from "@src/store/modals";

const ConsoleModals = () => {
  const { appLang } = useSelector(settingsState);
  const { trialDays } = useSelector(authState);
  const {
    showWelcomeModal,
    showTrialNoticeModal,
    showMissingTTSModal,
  } = useSelector(modalState);

  const dispatch = useDispatch();

  const modals = [
    {
      isVisible: showWelcomeModal,
      modalName: "welcome",
      videoId: appLang === "pt" ? "lfc3MTUbbWU" : false,
      onPress: () => {
        dispatch(
          updateModals({
            showWelcomeModal: false,
            showTrialNoticeModal: true,
          }),
        );
      },
      info: true,
    },
    {
      isVisible: showTrialNoticeModal,
      modalName: "trialNotice",
      variable: trialDays,
      onPress: () =>
        dispatch(
          updateModals({ showTrialNoticeModal: false }),
        ),
      info: true,
    },
    {
      isVisible: showMissingTTSModal,
      modalName: "missingTTS",
      videoId: "lfc3MTUbbWU",
      onPress: () => {
        dispatch(
          updateModals({
            showMissingTTSModal: false,
          }),
        );
      },
      info: true,
    },
  ];

  return (
    <>
      {modals.map((modalProps, index) => (
        <AppModal key={index} {...modalProps} />
      ))}
    </>
  );
};

export default ConsoleModals;
