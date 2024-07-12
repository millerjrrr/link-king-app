import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  token: "",
  trialDays: 7,
  subscribed: false,
  vip: true,
  busy: false,
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
    updateLoggedInState(authState, { payload }) {
      authState.loggedIn = payload;
    },
    updateToken(authState, { payload }) {
      authState.token = payload;
    },
    updateTrialDays(authState, { payload }) {
      authState.trialDays = payload;
    },
    updateSubscribed(authState, { payload }) {
      authState.subscribed = payload;
    },
    updateVip(authState, { payload }) {
      authState.vip = payload;
    },
    updateBusyState(authState, { payload }) {
      authState.busy = payload;
    },
    updateConnectedState(authState, { payload }) {
      authState.connected = payload;
    },
    updateName(authState, { payload }) {
      authState.formName = payload;
    },
    updateEmail(authState, { payload }) {
      authState.formEmail = payload;
    },
    updateUnverifiedUserId(authState, { payload }) {
      authState.unverifiedUserId = payload;
    },
    refreshPage(authState) {
      authState.connected = true;
      authState.refresh += 1;
    },
  },
});

export const {
  updateToken,
  updateTrialDays,
  updateSubscribed,
  updateVip,
  updateLoggedInState,
  updateBusyState,
  updateConnectedState,
  refreshPage,
  updateName,
  updateEmail,
  updateUnverifiedUserId,
} = slice.actions;

export const getAuthState = createSelector(
  (authState) => authState,
  (state) => state.auth,
);

export default slice.reducer;
