import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  colorScheme: "light",
  golden: 0,
};

const slice = createSlice({
  name: "colors",
  initialState,
  reducers: {
    updateColors(state, { payload }) {
      return { ...state, ...payload };
    },
  },
});

export const { updateColors } = slice.actions;

export const getColorsState = createSelector(
  (state) => state,
  (state) => state.colors,
);

export default slice.reducer;
