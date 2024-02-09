import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./auth";
import consoleReducer from "./console";
import statsReducer from "./stats";

const rootReducer = combineReducers({
  auth: authReducer,
  console: consoleReducer,
  stats: statsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
