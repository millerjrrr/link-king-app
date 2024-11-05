import {
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@src/store";

interface Attempt {
  id: string;
  target: string;
  solutions: string[];
  speechLang: string;
}

interface Options {
  sound: boolean;
  blurred: boolean;
  timer: boolean;
}

interface Stats {
  due: number;
  steps: number;
  time: number;
  streak: number;
  newWords: number;
}

interface ConsoleState {
  attempt: Attempt;
  options: Options;
  stats: Stats;
  dictionary: string;
  tail: any[];
  tries: number;
  busy: boolean;
  page: boolean;
  formValue: string;
  lastAttempt: string;
  showSolution: boolean;
  timeOnThisWord: number;
  startedThisWord: number;
  isPlaying: boolean;
  key: number;
  timerIsOn: boolean;
  golden: number;
}

const initialState: ConsoleState = {
  attempt: {
    id: "",
    target: "",
    solutions: [],
    speechLang: "es",
  },
  options: { sound: true, blurred: false, timer: true },
  stats: {
    due: 0,
    steps: 0,
    time: 0,
    streak: 0,
    newWords: 0,
  },
  dictionary: "Spanish",
  tail: [],
  tries: 1,
  busy: false,
  page: true,
  formValue: "",
  lastAttempt: "",
  showSolution: false,
  timeOnThisWord: 0,
  startedThisWord: 0,
  isPlaying: false,
  key: 0,
  timerIsOn: false,
  golden: 0,
};

const slice = createSlice({
  name: "console",
  initialState,
  reducers: {
    updateOptions(state, action: PayloadAction<Options>) {
      state.options = action.payload;
    },
    updateTries(state) {
      state.tries -= 1;
      state.key += 1;
      state.isPlaying = true;
    },
    updateBusyState(state, action: PayloadAction<boolean>) {
      state.busy = action.payload;
    },
    updateFormValue(state, action: PayloadAction<string>) {
      state.formValue = action.payload;
    },
    resetConsole(state) {
      state.lastAttempt = state.formValue;
      state.tail = [];
      state.formValue = "";
      state.showSolution = true;
      state.isPlaying = false;
      state.key += 1;
      state.busy = false;
    },
    updateShowSolution(
      state,
      action: PayloadAction<boolean>,
    ) {
      state.showSolution = action.payload;
    },
    incrementTimeOnThisWord(
      state,
      action: PayloadAction<number>,
    ) {
      state.timeOnThisWord += action.payload;
    },
    resetTimeOnThisWord(state) {
      state.timeOnThisWord = 0;
    },
    restartTheTimer(state) {
      state.key += 1;
      state.isPlaying = true;
      state.startedThisWord = Date.now();
    },
    stopPlaying(state) {
      state.isPlaying = false;
    },
    backOut(state) {
      state.isPlaying = false;
      state.key += 1;
      state.timerIsOn = false;
      state.timeOnThisWord = 0;
    },
    resetTimer(state) {
      state.key += 1;
      state.startedThisWord = Date.now();
    },
    updateTimerIsOn(state, action: PayloadAction<boolean>) {
      state.timerIsOn = action.payload;
    },
    updateCSState(
      state,
      action: PayloadAction<Partial<ConsoleState>>,
    ) {
      return { ...state, ...action.payload };
    },
    incrementStatsTime(
      state,
      action: PayloadAction<number>,
    ) {
      state.stats.time += action.payload;
    },
    updateDictionary(state, action: PayloadAction<string>) {
      state.dictionary = action.payload;
    },
  },
});

export const {
  updateOptions,
  updateTries,
  updateBusyState,
  updateFormValue,
  resetConsole,
  updateShowSolution,
  incrementTimeOnThisWord,
  resetTimeOnThisWord,
  restartTheTimer,
  stopPlaying,
  backOut,
  resetTimer,
  updateTimerIsOn,
  updateCSState,
  incrementStatsTime,
  updateDictionary,
} = slice.actions;

export const consoleState = (state: RootState) =>
  state.console;

export default slice.reducer;
