import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./auth";
import collectionReducer from "./collection";
import colorsReducer from "./colors";
import consoleReducer from "./console";
import notificationReducer from "./notification";
import statsReducer from "./stats";

const rootReducer = combineReducers({
  auth: authReducer,
  collection: collectionReducer,
  colors: colorsReducer,
  console: consoleReducer,
  notification: notificationReducer,
  stats: statsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
