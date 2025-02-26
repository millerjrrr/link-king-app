import {
  configureStore,
  createAction,
} from "@reduxjs/toolkit";
import { combineReducers, Reducer } from "redux";
import adminReducer from "./admin";
import authReducer from "./auth";
import collectionReducer from "./collection";
import dictionaryLookupReducer from "./dictionaryLookup";
import settingsReducer from "./settings";
import consoleReducer from "./console";
import notificationReducer from "./notification";
import statsReducer from "./stats";
import redCoverReducer from "./redCover";
import modalsReducer from "./modals";

export const resetStore = createAction("RESET_STORE");

const appReducers = combineReducers({
  admin: adminReducer,
  auth: authReducer,
  collection: collectionReducer,
  dictionaryLookup: dictionaryLookupReducer,
  console: consoleReducer,
  notification: notificationReducer,
  settings: settingsReducer,
  stats: statsReducer,
  redCover: redCoverReducer,
  modals: modalsReducer,
});

const rootReducer: Reducer<RootState, any> = (
  state,
  action,
) => {
  if (resetStore.match(action)) {
    state = undefined;
  }
  return appReducers(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof appReducers>;

export type AppDispatch = typeof store.dispatch;

export default store;
