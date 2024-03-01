import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  token: "",
  busy: false,
  connected: true,
  refresh: 0,
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
    updateBusyState(authState, { payload }) {
      authState.busy = payload;
    },
    updateConnectedState(authState, { payload }) {
      authState.connected = payload;
    },
    refreshPage(authState) {
      authState.connected = true;
      authState.refresh += 1;
    },
  },
});

export const {
  updateToken,
  updateLoggedInState,
  updateBusyState,
  updateConnectedState,
  refreshPage,
} = slice.actions;

export const getAuthState = createSelector(
  (authState) => authState,
  (state) => state.auth,
);

export default slice.reducer;
