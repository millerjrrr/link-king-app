import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@src/store";

interface CollectionState {
  searchKeyword: string;
  tickets: any[];
  page: number;
  allDataLoaded: boolean;
  results: number;
  busy: boolean;
  wordDeletedSuccessfully: boolean;
  wordDeleteButtonPressed: boolean;
}

const initialState: CollectionState = {
  searchKeyword: "",
  tickets: [],
  results: 0,
  page: 1,
  allDataLoaded: false,
  busy: false,
  wordDeletedSuccessfully: true,
  wordDeleteButtonPressed: false,
};

const slice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    updateSearchKeyword(state, action) {
      state.searchKeyword = action.payload;
    },
    updateTickets(state, action) {
      state.tickets = action.payload;
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
    updateWordDeletedSuccessfully(state, action) {
      state.wordDeletedSuccessfully = action.payload;
    },
    updateWordDeleteButtonPressed(state, action) {
      state.wordDeleteButtonPressed = action.payload;
    },
  },
});

export const {
  updateSearchKeyword,
  updateTickets,
  updateResults,
  updatePage,
  updateAllDataLoaded,
  updateBusy,
  updateWordDeletedSuccessfully,
  updateWordDeleteButtonPressed,
} = slice.actions;

export const collectionState = (state: RootState) =>
  state.collection;

export default slice.reducer;
