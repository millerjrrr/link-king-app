import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  attempt: { target: "", solutions: [] },
  options: { sound: true, blurred: false, timer: true },
  tail: [],
  tries: 1,
  busy: false,
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
    updateTail(consoleState, { payload }) {
      consoleState.tail = payload;
    },
    updateTries(consoleState, { payload }) {
      consoleState.tries = payload;
    },
    updateBusyState(consoleState, { payload }) {
      consoleState.busy = payload;
    },
  },
});

export const {
  updateAttempt,
  updateOptions,
  updateTail,
  updateTries,
  updateBusyState,
} = slice.actions;

export const getConsoleState = createSelector(
  (consoleState) => consoleState,
  (state) => state.console,
);

export default slice.reducer;
