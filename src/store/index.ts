import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./auth";
import collectionReducer from "./collection";
import settingsReducer from "./settings";
import consoleReducer from "./console";
import notificationReducer from "./notification";
import statsReducer from "./stats";

const rootReducer = combineReducers({
  auth: authReducer,
  collection: collectionReducer,
  console: consoleReducer,
  notification: notificationReducer,
  settings: settingsReducer,
  stats: statsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
