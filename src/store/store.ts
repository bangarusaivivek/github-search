import { ThunkAction, configureStore, Action } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import searchDataReducer from "./Home/searchDataSlice";
import repositoryDataReducer from "./Home/repositoryDataSlice";

const rootReducer = combineReducers({
  searchData: searchDataReducer,
  repositoryData: repositoryDataReducer,
});

// Create store
const store = configureStore({
  reducer: rootReducer,
});

// Setup listeners
setupListeners(store.dispatch);

// Export types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
