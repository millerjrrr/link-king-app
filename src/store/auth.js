import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  user: null,
  token: "",
  busy: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser(authState, { payload }) {
      authState.user = payload;
    },
    updateLoggedInState(authState, { payload }) {
      authState.loggedIn = payload;
    },
    updateToken(authState, { payload }) {
      authState.token = payload;
    },
    updateBusyState(authState, { payload }) {
      authState.busy = payload;
    },
  },
});

export const {
  updateUser,
  updateToken,
  updateLoggedInState,
  updateBusyState,
} = slice.actions;

export const getAuthState = createSelector(
  (authState) => authState,
  (authState) => authState,
);

export default slice.reducer;
