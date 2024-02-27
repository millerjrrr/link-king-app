import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  levelBreakdown: [],
  userGameData: null,
  busy: true,
  connected: true,
  page: true,
};

const slice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    updateLevelBreakdown(statsState, { payload }) {
      statsState.levelBreakdown = payload;
    },
    updateUserGameData(statsState, { payload }) {
      statsState.userGameData = payload;
    },
    updateBusyState(statsState, { payload }) {
      statsState.busy = payload;
    },
    updateConnectedState(statsState, { payload }) {
      statsState.connected = payload;
    },
    updatePageState(statsState, { payload }) {
      statsState.page = payload;
    },
  },
});

export const {
  updateLevelBreakdown,
  updateUserGameData,
  updateBusyState,
  updateConnectedState,
  updatePageState,
} = slice.actions;

export const getStatsState = createSelector(
  (statsState) => statsState,
  (state) => state.stats,
);

export default slice.reducer;
