import {
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@src/store";

interface NotificationState {
  message: string;
  type: "error" | "info" | "success";
}

const initialState: NotificationState = {
  message: "",
  type: "error",
};

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateNotification(
      state,
      action: PayloadAction<NotificationState>,
    ) {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
  },
});

export const { updateNotification } = slice.actions;

export const getNotificationState = createSelector(
  (notificationState) => notificationState,
  (state: RootState) => state.notification,
);

export default slice.reducer;
