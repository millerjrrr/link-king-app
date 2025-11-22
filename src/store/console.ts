import { LanguageName } from "@assets/text/interface";
import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@src/store";

interface Display {
  raceTrack: string;
  tail: string[];
}

interface GamePlay {
  id: string;
  level: number;
  rating: number;
  solutions: string[];
  speechLang: string;
  target: string;
}

interface Options {
  sound: boolean;
  blurred: boolean;
  timer: boolean;
  bing: boolean;
  listening: boolean;
}

interface Stats {
  due: number;
  steps: number;
  time: number;
  streak: number;
  newWords: number;
}

interface Locals {
  formValue: string;
  lastAttempt: string;
  showSolution: boolean;
  startedThisWord: number;
  isPlaying: boolean;
  timerIsOn: boolean;
  timerKey: number;
  busy: boolean;
  golden: number;
  options: Options;
  musicIsPlaying: boolean;
  isDisabled: boolean;
  showTypeTranslationsInfoBox: boolean;
}

interface ConsoleState {
  dictionary: LanguageName;
  display: Display;
  gamePlay: GamePlay;
  stats: Stats;
  locals: Locals;
}

const initialState: ConsoleState = {
  dictionary: "Spanish",
  display: { raceTrack: "", tail: [] },
  gamePlay: {
    id: "",
    level: 0,
    rating: 400,
    solutions: [],
    target: "",
    speechLang: "",
  },
  stats: {
    due: 0,
    newWords: 0,
    steps: 0,
    streak: 0,
    time: 0,
  },
  locals: {
    formValue: "",
    lastAttempt: "",
    showSolution: false,
    startedThisWord: 0,
    isPlaying: false,
    timerIsOn: false,
    timerKey: 0,
    busy: false,
    golden: 0,
    options: {
      sound: true,
      blurred: false,
      timer: true,
      bing: true,
      listening: false,
    },
    musicIsPlaying: false,
    isDisabled: false,
    showTypeTranslationsInfoBox: true,
  },
};

const slice = createSlice({
  name: "console",
  initialState,
  reducers: {
    updateOptions(
      state,
      action: PayloadAction<Partial<Options>>
    ) {
      Object.assign(state.locals.options, action.payload);
    },
    updateBusyState(state, action: PayloadAction<boolean>) {
      state.locals.busy = action.payload;
    },
    updateFormValue(state, action: PayloadAction<string>) {
      state.locals.formValue = action.payload;
    },
    resetConsole(state) {
      const { locals, display } = state;
      display.tail = [];
      Object.assign(locals, {
        lastAttempt: locals.formValue,
        formValue: "",
        isPlaying: false,
        busy: false,
        timerKey: locals.timerKey + 1,
      });
    },
    updateShowSolution(
      state,
      action: PayloadAction<boolean>
    ) {
      state.locals.showSolution = action.payload;
    },
    restartTheTimer(state) {
      state.locals.timerKey += 1;
      state.locals.isPlaying = true;
      state.locals.startedThisWord = Date.now();
    },
    stopPlaying(state) {
      state.locals.isPlaying = false;
    },
    backOut(state) {
      Object.assign(state.locals, {
        isPlaying: false,
        timerKey: state.locals.timerKey + 1,
        timerIsOn: false,
      });
    },
    resetTimer(state) {
      state.locals.timerKey += 1;
      state.locals.startedThisWord = Date.now();
    },
    updateTimerIsOn(state, action: PayloadAction<boolean>) {
      state.locals.timerIsOn = action.payload;
    },
    updateConsoleState(
      state,
      action: PayloadAction<Partial<ConsoleState>>
    ) {
      return { ...state, ...action.payload };
    },
    updateLocals(
      state,
      action: PayloadAction<Partial<Locals>>
    ) {
      Object.assign(state.locals, action.payload);
    },
    incrementStatsTime(
      state,
      action: PayloadAction<number>
    ) {
      state.stats.time += action.payload;
    },
    updateDictionary(
      state,
      action: PayloadAction<LanguageName>
    ) {
      state.dictionary = action.payload;
    },
    toggleMusicIsPlaying(state) {
      state.locals.musicIsPlaying =
        !state.locals.musicIsPlaying;
    },
    setDisabled(state, action: PayloadAction<boolean>) {
      state.locals.isDisabled = action.payload;
    },
  },
});

export const {
  updateOptions,
  updateBusyState,
  updateFormValue,
  resetConsole,
  updateShowSolution,
  restartTheTimer,
  stopPlaying,
  backOut,
  resetTimer,
  updateTimerIsOn,
  updateConsoleState,
  updateLocals,
  incrementStatsTime,
  updateDictionary,
  toggleMusicIsPlaying,
  setDisabled,
} = slice.actions;

export const selectConsoleState = (state: RootState) =>
  state.console;

export const selectConsoleLocals = (state: RootState) =>
  state.console.locals;

export default slice.reducer;
