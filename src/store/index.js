import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./auth";
import consoleReducer from "./console";
import statsReducer from "./stats";
import notificationReducer from "./notification";

const rootReducer = combineReducers({
  auth: authReducer,
  console: consoleReducer,
  stats: statsReducer,
  notification: notificationReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
