import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./auth";
import consoleReducer from "./console";

const rootReducer = combineReducers({
  auth: authReducer,
  console: consoleReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
