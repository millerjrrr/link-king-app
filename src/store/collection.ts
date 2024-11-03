import {
  createSelector,
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
  reload: boolean;
  busy: boolean;
}

const initialState: CollectionState = {
  searchKeyword: "",
  tickets: [],
  page: 1,
  allDataLoaded: false,
  results: 0,
  reload: true,
  busy: false,
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

export const getCollectionState = createSelector(
  (collectionState) => collectionState,
  (state: RootState) => state.collection,
);

export default slice.reducer;
