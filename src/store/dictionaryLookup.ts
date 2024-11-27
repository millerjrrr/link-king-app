import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@src/store";

interface DictionaryLookupState {
  searchKeyword: string;
  dictEntries: any[];
  page: number;
  allDataLoaded: boolean;
  results: number;
  busy: boolean;
}

const initialState: DictionaryLookupState = {
  searchKeyword: "",
  dictEntries: [],
  results: 0,
  page: 1,
  allDataLoaded: false,
  busy: false,
};

const slice = createSlice({
  name: "dictionaryLookup",
  initialState,
  reducers: {
    updateSearchKeyword(state, action) {
      state.searchKeyword = action.payload;
    },
    updateDictEntries(state, action) {
      state.dictEntries = action.payload;
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
  updateDictEntries,
  updateResults,
  updatePage,
  updateAllDataLoaded,
  updateBusy,
} = slice.actions;

export const dictionaryLookupState = (state: RootState) =>
  state.dictionaryLookup;

export default slice.reducer;
