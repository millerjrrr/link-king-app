import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  busy: false,
  connected: true,
  reload: true,
};

const slice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    updateBusy(state, { payload }) {
      state.busy = payload;
    },
    updateConnected(state, { payload }) {
      state.connected = payload;
    },
    updateReload(state) {
      state.reload = !reload;
    },
  },
});

export const { updateBusy, updateConnected, updateReload } =
  slice.actions;

export const getConnectionState = createSelector(
  (state) => state,
  (state) => state.connection,
);

export default slice.reducer;
