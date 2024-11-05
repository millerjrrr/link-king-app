import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
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
    updateCollection(
      state,
      action: PayloadAction<Partial<CollectionState>>,
    ) {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateCollection } = slice.actions;

export const collectionState = (state: RootState) =>
  state.collection;

export default slice.reducer;
