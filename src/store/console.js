import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  attempt: {
    id: "",
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
    updateOptions(state, { payload }) {
      state.options = payload;
    }, //used in OptionsContainer
    updateTries(state) {
      state.tries -= 1;
      state.key += 1;
      state.isPlaying = true;
    }, // used exclusively in returnNextTry
    updateBusyState(state, { payload }) {
      state.busy = payload;
    },
    //CONSOLE STATE VARIABLES
    updateFormValue(state, { payload }) {
      state.formValue = payload;
    }, //used in onChangeText
    resetConsole(state) {
      state.lastAttempt = state.formValue;
      state.formValue = "";
      state.showSolution = true;
      state.isPlaying = false;
      state.timeOnThisWord = 0;
      state.key += 1;
      state.busy = false;
    }, //used at the end returnWrongAnswerToServer
    updateShowSolution(state, { payload }) {
      state.showSolution = payload;
    },
    incrementTimeOnThisWord(state, { payload }) {
      state.timeOnThisWord += payload;
    }, //used to manage the timeplaying clock in StatsContainer
    resetTimeOnThisWord(state) {
      state.timeOnThisWord = 0;
    }, //used in two separate instances
    restartTheTimer(state) {
      state.key += 1;
      state.isPlaying = true;
      state.startedThisWord = Date.now();
    }, //used after correct answer and when form field is focused
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
    },
    updateTimerIsOn(state, { payload }) {
      state.timerIsOn = payload;
    },
    // Group updates
    updateCSState(state, { payload }) {
      return { ...state, ...payload };
    },
    //TimeManagement
    incrementStatsTime(state, { payload }) {
      state.stats.time += payload;
    }, // helps to smooth the time handover to the server.important
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
} = slice.actions;

export const getConsoleState = createSelector(
  (state) => state,
  (state) => state.console,
);

export default slice.reducer;
