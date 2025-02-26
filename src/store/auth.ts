import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@src/store";

interface AuthState {
  loggedIn: boolean;
  justSignedUp: boolean;
  token: string;
  trialDays: number;
  subscribed: boolean;
  subscriptionPrice: string;
  vip: number;
  admin: boolean;
  busy: boolean;
  appLoading: boolean;
  connection:
    | "connected"
    | "disconnected"
    | "maintenance"
    | "unknown";
  refresh: number;
  accountName: string;
  accountEmail: string;
  unverifiedUserId: string;
  latestVersion: string;
}

const initialState: AuthState = {
  loggedIn: false,
  justSignedUp: false,
  token: "",
  trialDays: 0,
  subscribed: false,
  subscriptionPrice: "$12.99",
  vip: 4070919600000,
  admin: false,
  busy: false,
  appLoading: false,
  connection: "connected",
  refresh: 0,
  accountName: "",
  accountEmail: "",
  unverifiedUserId: "",
  latestVersion: "5.0.1",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateLoggedInState(
      state,
      action: PayloadAction<boolean>,
    ) {
      state.loggedIn = action.payload;
    },
    updateJustSignedUp(
      state,
      action: PayloadAction<boolean>,
    ) {
      state.justSignedUp = action.payload;
    },
    updateToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    updateTrialDays(state, action: PayloadAction<number>) {
      state.trialDays = action.payload;
    },
    updateSubscribed(
      state,
      action: PayloadAction<boolean>,
    ) {
      state.subscribed = action.payload;
    },
    updateSubscriptionPrice(
      state,
      action: PayloadAction<string>,
    ) {
      state.subscriptionPrice = action.payload;
    },
    updateVip(state, action: PayloadAction<number>) {
      state.vip = action.payload;
    },
    updateAdmin(state, action: PayloadAction<boolean>) {
      state.admin = action.payload;
    },
    updateBusyState(state, action: PayloadAction<boolean>) {
      state.busy = action.payload;
    },
    updateAppLoadingState(
      state,
      action: PayloadAction<boolean>,
    ) {
      state.appLoading = action.payload;
    },

    updateConnectedState(
      state,
      action: PayloadAction<
        | "connected"
        | "disconnected"
        | "maintenance"
        | "unknown"
      >,
    ) {
      state.connection = action.payload;
    },
    updateName(state, action: PayloadAction<string>) {
      state.accountName = action.payload;
    },
    updateEmail(state, action: PayloadAction<string>) {
      state.accountEmail = action.payload;
    },
    updateLatestVersion(
      state,
      action: PayloadAction<string>,
    ) {
      state.latestVersion = action.payload;
    },
    updateUnverifiedUserId(
      state,
      action: PayloadAction<string>,
    ) {
      state.unverifiedUserId = action.payload;
    },
    refreshPage(state) {
      state.connection = "connected";
      state.refresh += 1;
    },
  },
});

export const {
  updateToken,
  updateTrialDays,
  updateSubscribed,
  updateSubscriptionPrice,
  updateVip,
  updateAdmin,
  updateLoggedInState,
  updateJustSignedUp,
  updateBusyState,
  updateAppLoadingState,
  updateConnectedState,
  refreshPage,
  updateName,
  updateEmail,
  updateLatestVersion,
  updateUnverifiedUserId,
} = slice.actions;

export const authState = (state: RootState) => state.auth;

export default slice.reducer;
