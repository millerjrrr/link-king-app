import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./auth";
import consoleReducer from "./console";
import statsReducer from "./stats";
import collectionReducer from "./collection";
import notificationReducer from "./notification";
import connectionReducer from "./connection";

const rootReducer = combineReducers({
  auth: authReducer,
  collection: collectionReducer,
  connection: connectionReducer,
  console: consoleReducer,
  notification: notificationReducer,
  stats: statsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
