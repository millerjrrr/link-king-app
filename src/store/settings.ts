import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@src/store";

interface SettingsState {
  colorScheme:
    | "dark"
    | "blue"
    | "green"
    | "orange"
    | "pink"
    | "light";
  golden: number;
  timeGoal: number;
  newWordsGoal: number;
  stepsGoal: number;
  appLang: string;
  helpPulsing: number;
}

const initialState: SettingsState = {
  colorScheme: "dark",
  golden: 0,
  timeGoal: 3,
  newWordsGoal: 0,
  stepsGoal: 100,
  appLang: "en",
  helpPulsing: 0,
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
    incHelpPulsing(state) {
      state.helpPulsing += 1;
    },
  },
});

export const {
  updateSettings,
  restoreDefaultGoals,
  incHelpPulsing,
} = slice.actions;

export const settingsState = (state: RootState) =>
  state.settings;

export default slice.reducer;
