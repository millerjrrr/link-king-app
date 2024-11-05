import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@src/store";

interface RedCoverState {
  elapsedTime: number;
  redCoverZIndex: number;
}

const initialState: RedCoverState = {
  elapsedTime: 0,
  redCoverZIndex: 1,
};

const slice = createSlice({
  name: "redCover",
  initialState,
  reducers: {
    updateRedCover(
      state,
      action: PayloadAction<Partial<RedCoverState>>,
    ) {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateRedCover } = slice.actions;

export const redCoverState = (state: RootState) =>
  state.redCover;

export default slice.reducer;
