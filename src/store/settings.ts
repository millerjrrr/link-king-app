import {
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@src/store";

interface SettingsState {
  colorScheme: "dark" | "light";
  golden: number;
  timeGoal: number;
  newWordsGoal: number;
  stepsGoal: number;
  appLang: string;
}

const initialState: SettingsState = {
  colorScheme: "dark",
  golden: 0,
  timeGoal: 3,
  newWordsGoal: 0,
  stepsGoal: 100,
  appLang: "en",
};

const slice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateSettings(
      state,
      action: PayloadAction<Partial<SettingsState>>,
    ) {
      return { ...state, ...action.payload };
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
  (settingsState) => settingsState,
  (state: RootState) => state.settings,
);

export default slice.reducer;
