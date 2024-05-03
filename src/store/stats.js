import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  levelBreakdown: [],
  userGameData: {
    blurred: true,
    collectedWords: 0,
    collectedWordsToday: 0,
    dueToday: [],
    playingMode: "ratings",
    rating: 400,
    ratingPeak: 400,
    ratingPlays: 0,
    sound: true,
    stepsTakenLifetime: 0,
    stepsTakenToday: 0,
    streakCurrent: 0,
    streakRecord: 0,
    streakToday: 0,
    timePlayingLifetime: 0,
    timePlayingToday: 0,
    timer: true,
  },
  username: "anonymous",
  busy: false,
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
    updateUserName(statsState, { payload }) {
      statsState.username = payload;
    },
    updateBusyState(statsState, { payload }) {
      statsState.busy = payload;
    },
    updatePageState(statsState, { payload }) {
      statsState.page = payload;
    },
  },
});

export const {
  updateLevelBreakdown,
  updateUserGameData,
  updateUserName,
  updateBusyState,
  updatePageState,
} = slice.actions;

export const getStatsState = createSelector(
  (statsState) => statsState,
  (state) => state.stats,
);

export default slice.reducer;
