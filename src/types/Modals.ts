export type Modal = ModalWithMessage | ModalWithoutMessage;

export type ModalWithMessage = keyof Modals;

export type ModalWithoutMessage =
  | "definitionInWebViewModal"
  | "webViewModal"
  | "newWordAddedModal";

export interface Modals {
  leaveAReviewModal: ModalsMessage;
  contactUsModal: ModalsMessage;
  logOutModal: ModalsMessage;
  setDailyGoalModal: ModalsMessage;
  repeatRepeatsModal: ModalsMessage;
  welcomeModal: ModalsMessage;
  trialNoticeModal: ModalsMessage;
  collectionInfoModal: ModalsMessage;
  missingTTSModal: ModalsMessage;
  dailyGoalInfoModal: ModalsMessage;
}

interface ModalsMessage {
  title?: string;
  modalMessage: string;
  modalMessage2?: string;
  cancel: string;
}
