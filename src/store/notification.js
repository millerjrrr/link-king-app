import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "error",
};

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateNotification(notificationState, { payload }) {
      notificationState.message = payload.message;
      notificationState.type = payload.type;
    },
  },
});

export const { updateNotification } = slice.actions;

export const getNotificationState = createSelector(
  (notificationState) => notificationState,
  (state) => state.notification,
);

export default slice.reducer;
