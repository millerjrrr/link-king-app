import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@src/store";

interface NotificationState {
  message: string;
  type: "error" | "info" | "success" | "longInfo";
  level: number;
  popType: boolean;
}

interface NotificationPayload {
  message: string;
  type: "error" | "info" | "success" | "longInfo";
}

interface LevelPopPayload {
  level: number;
  popType: boolean;
}

const initialState: NotificationState = {
  message: "",
  type: "error",
  level: 0,
  popType: false,
};

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateNotification(
      state,
      action: PayloadAction<NotificationPayload>,
    ) {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    updateLevelPop(
      state,
      action: PayloadAction<LevelPopPayload>,
    ) {
      state.level = action.payload.level;
      state.popType = action.payload.popType;
    },
  },
});

export const { updateNotification, updateLevelPop } =
  slice.actions;

export const notificationState = (state: RootState) =>
  state.notification;

export default slice.reducer;
