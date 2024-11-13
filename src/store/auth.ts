import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@src/store";

interface AuthState {
  loggedIn: boolean;
  token: string;
  trialDays: number;
  subscribed: boolean;
  subscriptionPrice: string;
  vip: number;
  busy: boolean;
  appLoading: boolean;
  connected: boolean;
  refresh: number;
  formName: string;
  formEmail: string;
  unverifiedUserId: string;
}

const initialState: AuthState = {
  loggedIn: false,
  token: "",
  trialDays: 0,
  subscribed: false,
  subscriptionPrice: "$12.99",
  vip: 4070919600000,
  busy: false,
  appLoading: false,
  connected: true,
  refresh: 0,
  formName: "",
  formEmail: "",
  unverifiedUserId: "",
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
      action: PayloadAction<boolean>,
    ) {
      state.connected = action.payload;
    },
    updateName(state, action: PayloadAction<string>) {
      state.formName = action.payload;
    },
    updateEmail(state, action: PayloadAction<string>) {
      state.formEmail = action.payload;
    },
    updateUnverifiedUserId(
      state,
      action: PayloadAction<string>,
    ) {
      state.unverifiedUserId = action.payload;
    },
    refreshPage(state) {
      state.connected = true;
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
  updateLoggedInState,
  updateBusyState,
  updateAppLoadingState,
  updateConnectedState,
  refreshPage,
  updateName,
  updateEmail,
  updateUnverifiedUserId,
} = slice.actions;

export const authState = (state: RootState) => state.auth;

export default slice.reducer;
