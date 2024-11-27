import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@src/store";

interface Ticket {
  id?: string;
  target?: string;
  solutions?: string[];
  rating?: number;
  level?: number;
}

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
  showNewWordAddedModal: boolean;
  ticket: Ticket;
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
  showNewWordAddedModal: false,
  ticket: {
    id: "67461974410ac48a9222d62c",
    target: "abalanzar",
    solutions: ["compensate"],
    rating: 500,
    level: 1,
  },
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
