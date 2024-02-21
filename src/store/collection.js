import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  searchKeyword: "",
  tickets: [],
  filteredTickets: [],
  page: true,
  busy: true,
  connected: true,
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
