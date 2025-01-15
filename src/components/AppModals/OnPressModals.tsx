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
import { Linking } from "react-native";
import { updateNotification } from "@src/store/notification";
import useLogOut from "./../../hooks/authHooks/useLogOut";
import goToRatingPage from "@src/utils/goToRatingsInAppStore";
import useRestoreGoalDefaults from "@src/hooks/optionsHooks/useRestoreGoalDefaults";
import useFetchConsoleInfo from "./../../hooks/consoleHooks/useFetchConsoleInfo";

const OnPressModals = () => {
  const { CONTRAST } = useColors();
  const { appLang } = useSelector(settingsState);
  const { modalShowing } = useSelector(modalState);

  const { subject: subjectText } =
    appTextSource(appLang).options.contactUs;
  const logOut = useLogOut();
  const restoreGoalDefaults = useRestoreGoalDefaults();

  const fetchConsoleInfo = useFetchConsoleInfo();

  const onPress: Partial<
    Record<ModalWithMessage, () => void>
  > = {
    leaveAReviewModal: goToRatingPage,
    contactUsModal: () => {
      const email = "info@link-king.com";
      const subject = encodeURIComponent(subjectText);
      const url = `mailto:${email}?subject=${subject}`;
      Linking.openURL(url).catch((err) =>
        dispatch(
          updateNotification({
            message: err,
            type: "error",
          }),
        ),
      );
    },
    logOutModal: logOut,
    setDailyGoalModal: restoreGoalDefaults,
    repeatRepeatsModal: () => {
      dispatch(updateModals({ modalShowing: "" }));
      fetchConsoleInfo(true);
    },
    ratingInfoModal: () => {
      Linking.openURL(
        "https://link-king.com/2025/01/06/what-is-an-elo-rating/",
      );
    },
  };

  const name: ModalWithMessage = Object.keys(
    onPress,
  ).includes(modalShowing)
    ? (modalShowing as ModalWithMessage)
    : "logOutModal";
  const { modalMessage, cancel, title } =
    appTextSource(appLang).modals[name];

  const dispatch = useDispatch();
  const close = () => {
    dispatch(
      updateModals({
        modalShowing: "",
      }),
    );
  };

  return (
    <AppModal name={name}>
      <ModalText color={CONTRAST}>{modalMessage}</ModalText>
      <ModalButton
        title={title || ""}
        size={20}
        onPress={
          onPress[name] ? onPress[name] : () => void 0
        }
      />
      <ModalButton
        title={cancel}
        size={15}
        onPress={close}
      />
    </AppModal>
  );
};

export default OnPressModals;
