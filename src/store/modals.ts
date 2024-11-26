import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@src/store";

interface ModalState {
  showSetDailyGoalModal: boolean;
  showDailyGoalInfoModal: boolean;
  showCollectionInfoModal: boolean;
  showWelcomeModal: boolean;
  showTrialNoticeModal: boolean;
  showMissingTTSModal: boolean;
  showDefinitionInWebViewModal: boolean;
  definitionSearchWord: string;
  definitionSearchLanguage: string;
}

const initialState: ModalState = {
  showSetDailyGoalModal: false,
  showDailyGoalInfoModal: false,
  showCollectionInfoModal: false,
  showWelcomeModal: false,
  showTrialNoticeModal: false,
  showMissingTTSModal: false,
  showDefinitionInWebViewModal: false,
  definitionSearchWord: "",
  definitionSearchLanguage: "",
};

const slice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    updateModals(
      state,
      action: PayloadAction<Partial<ModalState>>,
    ) {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateModals } = slice.actions;

export const modalState = (state: RootState) =>
  state.modals;

export default slice.reducer;
