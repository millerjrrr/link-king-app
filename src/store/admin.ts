import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@src/store";

interface AdminState {
  searchKeyword: string;
  users: any[];
  page: number;
  allDataLoaded: boolean;
  results: number;
  busy: boolean;
}

const initialState: AdminState = {
  searchKeyword: "",
  users: [],
  results: 0,
  page: 1,
  allDataLoaded: false,
  busy: false,
};

const slice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateSearchKeyword(state, action) {
      state.searchKeyword = action.payload;
    },
    updateUsers(state, action) {
      state.users = action.payload;
    },
    updateResults(state, action) {
      state.results = action.payload;
    },
    updatePage(state, action) {
      state.page = action.payload;
    },
    updateAllDataLoaded(state, action) {
      state.allDataLoaded = action.payload;
    },
    updateBusy(state, action) {
      state.busy = action.payload;
    },
  },
});

export const {
  updateSearchKeyword,
  updateUsers,
  updateResults,
  updatePage,
  updateAllDataLoaded,
  updateBusy,
} = slice.actions;

export const adminState = (state: RootState) => state.admin;

export default slice.reducer;
