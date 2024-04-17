import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchDataState, SearchResultResponse } from "./typings";

const initialState: SearchDataState = {
  results: [],
  loading: false,
  page: 1,
  totalCount: 0,
};

export const searchDataSlice = createSlice({
  name: "searchData",
  initialState,
  reducers: {
    // Reducer to set search results
    setSearchResults: (state, action: PayloadAction<SearchResultResponse>) => {
      if (action.payload.page === 1) {
        state.results = action.payload.items
      } else {
        state.results = [...state.results, ...action.payload.items];
      }
      state.page = action.payload.page;
      state.totalCount = action.payload.total_count;
      state.loading = false;
    },
    // Reducer to set search page
    setSearchPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    // Reducer to set search loading state
    setSearchLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Reducer to clear search results
    setClearSearchResults: (state) => {
      state.results = []
      state.page = 1
      state.totalCount = 0
    }
  },
});

export const { setSearchResults, setSearchPage, setSearchLoading, setClearSearchResults } = searchDataSlice.actions;

export default searchDataSlice.reducer;
