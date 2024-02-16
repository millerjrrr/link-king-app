import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  token: "",
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
  },
});

export const { updateToken, updateLoggedInState } =
  slice.actions;

export const getAuthState = createSelector(
  (authState) => authState,
  (state) => state.auth,
);

export default slice.reducer;
