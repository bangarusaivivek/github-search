import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RepositoryData, RepositoryDataState } from "./typings";

// Function to load data from local storage
const loadDataFromLocalStorage = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return undefined;
  }
};

// Initial state for repository data slice
const initialState: RepositoryDataState = {
  currentRepositoryData: {
    id: 0,
    html_url: "",
    full_name: "",
    private: false,
    description: "",
    updated_at: "",
    language: "",
    stargazers_count: 0,
    forks: 0,
    name: "",
  },
  loading: false,
  isDataPresent: false,
  recentSearchStrings: loadDataFromLocalStorage("recentSearchStrings") || [],
  previousStates: [],
  nextStates: [],
};

// Create repository data slice using createSlice from Redux Toolkit
export const repositoryDataSlice = createSlice({
  name: "repositoryData",
  initialState,
  reducers: {
    // Reducer to set the current repository data
    setCurrentRepository: (state, action: PayloadAction<RepositoryData>) => {
      state.previousStates.push(state.currentRepositoryData);
      state.currentRepositoryData = action.payload;
      state.isDataPresent = true;
      state.nextStates = []; // Clear nextStates
      state.loading = false;
    },
    // Reducer to set repository loading state
    setRepositoryLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Reducer to handle previous state navigation
    setOnPreviousClick: (state) => {
      if (state.previousStates.length > 0) {
        const previousState = state.previousStates.pop();
        state.nextStates.unshift(state.currentRepositoryData);
        if (previousState) {
          state.currentRepositoryData = previousState;
        }
        state.loading = false;
      }
    },
    // Reducer to handle next state navigation
    setOnNextClick: (state) => {
      if (state.nextStates.length > 0) {
        const nextState = state.nextStates.shift();
        if (nextState) {
          state.previousStates.push(state.currentRepositoryData);
          state.currentRepositoryData = nextState;
        }
        state.loading = false;
      }
    },
    // Reducer to clear repository data
    setClearData: (state) => {
      state.currentRepositoryData = initialState.currentRepositoryData;
      state.previousStates = [];
      state.nextStates = [];
    },
    // Reducer to set recent search strings
    setRecentSearchStrings: (state, action: PayloadAction<string>) => {
      const filteredData = state.recentSearchStrings.filter(
        (item) => item === action.payload
      );

      if (filteredData.length === 0) {
        state.recentSearchStrings.unshift(action.payload);
        state.recentSearchStrings = state.recentSearchStrings.slice(0, 3);
        localStorage.setItem(
          "recentSearchStrings",
          JSON.stringify(state.recentSearchStrings)
        );
      }
    },
  },
});

export const {
  setCurrentRepository,
  setRepositoryLoading,
  setOnNextClick,
  setOnPreviousClick,
  setClearData,
  setRecentSearchStrings,
} = repositoryDataSlice.actions;

export default repositoryDataSlice.reducer;
