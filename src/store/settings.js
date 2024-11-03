import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  colorScheme: "dark",
  golden: 0,
  timeGoal: 3,
  newWordsGoal: 0,
  stepsGoal: 100,
  appLang: "en",
};

const slice = createSlice({
  name: "colors",
  initialState,
  reducers: {
    updateSettings(state, { payload }) {
      return { ...state, ...payload };
    },
    restoreDefaultGoals(state) {
      state.timeGoal = 3;
      state.newWordsGoal = 1;
      state.stepsGoal = 100;
    },
  },
});

export const { updateSettings, restoreDefaultGoals } =
  slice.actions;

export const getSettingsState = createSelector(
  (state) => state,
  (state) => state.settings,
);

export default slice.reducer;
