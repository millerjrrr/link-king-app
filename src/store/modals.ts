import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@src/store";
import { Modal } from "@src/types/Modals";
import Ticket from "@src/types/Ticket";

interface ModalState {
  modalShowing: Modal | "";
  definitionSearchWord: string;
  definitionSearchLanguage: string;
  showNewWordAddedModal: boolean;
  ticket: Ticket | {};
  webViewUrl: string;
}

const initialState: ModalState = {
  modalShowing: "",
  definitionSearchWord: "",
  definitionSearchLanguage: "",
  showNewWordAddedModal: false,
  ticket: {},
  webViewUrl: "",
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
