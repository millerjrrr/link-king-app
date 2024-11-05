import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@src/store";

interface RedCoverState {
  startTime: number;
  elapsedTime: number;
  redCoverZIndex: number;
}

const initialState: RedCoverState = {
  startTime: 0,
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
