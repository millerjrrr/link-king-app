import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  searchKeyword: "",
  tickets: [],
  page: 1,
  allDataLoaded: false,
  results: 0,
  reload: true,
  busy: true,
};

const slice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    updateCollection(collectionState, { payload }) {
      return { ...collectionState, ...payload };
    },
  },
});

export const { updateCollection } = slice.actions;

export const getCollectionState = createSelector(
  (collectionState) => collectionState,
  (state) => state.collection,
);

export default slice.reducer;
