import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  colorScheme: "dark",
  golden: 0,
  timeGoal: "",
  newWordsGoal: 1,
  stepsGoal: "",
};

const slice = createSlice({
  name: "colors",
  initialState,
  reducers: {
    updateSettings(state, { payload }) {
      return { ...state, ...payload };
    },
  },
});

export const { updateSettings } = slice.actions;

export const getSettingsState = createSelector(
  (state) => state,
  (state) => state.settings,
);

export default slice.reducer;
