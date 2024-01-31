import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  target: "",
  solutions: [],
};

const slice = createSlice({
  name: "console",
  initialState,
  reducers: {
    updateTarget(consoleState, { payload }) {
      consoleState.target = payload;
    },
    updateSolutions(consoleState, { payload }) {
      consoleState.solutions = payload;
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
  updateTarget,
  updateSolutions,
  updateTries,
  updateBusyState,
} = slice.actions;

export const getConsoleState = createSelector(
  (consoleState) => consoleState,
  (state) => state.console,
);

export default slice.reducer;
