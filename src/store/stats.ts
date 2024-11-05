import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@src/store";

interface UserGameData {
  blurred: boolean;
  collectedWords: number;
  collectedWordsToday: number;
  dueToday: any[];
  playingMode: "ratings" | "progressive";
  rating: number;
  ratingPeak: number;
  ratingPlays: number;
  sound: boolean;
  stepsTakenLifetime: number;
  stepsTakenToday: number;
  streakCurrent: number;
  streakRecord: number;
  streakToday: number;
  timePlayingLifetime: number;
  timePlayingToday: number;
  timer: boolean;
}

interface StatsState {
  levelBreakdown: any[];
  userGameData: UserGameData;
  username: string;
  busy: boolean;
  page: boolean;
}

const initialState: StatsState = {
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
    updateLevelBreakdown(
      state,
      action: PayloadAction<any[]>,
    ) {
      state.levelBreakdown = action.payload;
    },
    updateUserGameData(
      state,
      action: PayloadAction<Partial<UserGameData>>,
    ) {
      state.userGameData = {
        ...state.userGameData,
        ...action.payload,
      };
    },
    updateUserName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    updateBusyState(state, action: PayloadAction<boolean>) {
      state.busy = action.payload;
    },
    updatePageState(state, action: PayloadAction<boolean>) {
      state.page = action.payload;
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

export const statsState = (state: RootState) => state.stats;

export default slice.reducer;
