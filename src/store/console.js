import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  attempt: {
    target: "",
    solutions: [],
    speechLang: "en-US",
  },
  options: { sound: true, blurred: false, timer: true },
  stats: {
    due: 0,
    steps: 0,
    time: 0,
    streak: 0,
    newWords: 0,
  },
  tail: [],
  tries: 1,
  busy: true,
  connected: true,
  formValue: "",
  showSolution: "",
  timeOnThisWord: 0,
  isPlaying: false,
  key: 0,
  timerIsOn: false,
};

const slice = createSlice({
  name: "console",
  initialState,
  reducers: {
    updateAttempt(consoleState, { payload }) {
      consoleState.attempt = payload;
    },
    updateOptions(consoleState, { payload }) {
      consoleState.options = payload;
    },
    updateStats(consoleState, { payload }) {
      consoleState.stats = payload;
    },
    updateTail(consoleState, { payload }) {
      consoleState.tail = payload;
    },
    updateTries(consoleState, { payload }) {
      consoleState.tries = payload;
    },
    updateBusyState(consoleState, { payload }) {
      consoleState.busy = payload;
    },
    updateConnectedState(consoleState, { payload }) {
      consoleState.connected = payload;
    },
    //CONSOLE STATE VARIABLES
    updateFormValue(consoleState, { payload }) {
      consoleState.formValue = payload;
    },
    updateShowSolution(consoleState, { payload }) {
      consoleState.showSolution = payload;
    },
    updateTimeOnThisWord(consoleState, { payload }) {
      consoleState.timeOnThisWord = payload;
    },
    updateIsPlaying(consoleState, { payload }) {
      consoleState.isPlaying = payload;
    },
    updateKey(consoleState) {
      consoleState.key += 1;
    },
    updateTimerIsOn(consoleState, { payload }) {
      consoleState.timerIsOn = payload;
    },
  },
});

export const {
  updateAttempt,
  updateOptions,
  updateStats,
  updateTail,
  updateTries,
  updateBusyState,
  updateConnectedState,
  updateFormValue,
  updateShowSolution,
  updateTimeOnThisWord,
  updateIsPlaying,
  updateKey,
  updateTimerIsOn,
} = slice.actions;

export const getConsoleState = createSelector(
  (consoleState) => consoleState,
  (state) => state.console,
);

export default slice.reducer;
