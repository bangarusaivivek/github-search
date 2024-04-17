import React from "react";
import "./App.css";
import { Search } from "./features/home/components/Search";
import { Navigation } from "./features/home/components/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setClearSearchResults } from "./store";
import { RepoCard } from "./features/home/components/RepoCard";
import {
  setClearData,
  setOnNextClick,
  setOnPreviousClick,
} from "./store/Home/repositoryDataSlice";

function App() {
  const dispatch = useDispatch();

  const { currentRepositoryData, previousStates, nextStates } = useSelector((state: RootState) => state.repositoryData);

  // Define event handlers
  const handlePreviousClick = () => {
    dispatch(setOnPreviousClick());
  };

  const handleNextClick = () => {
    dispatch(setOnNextClick());
  };

  const handleHomeClick = () => {
    dispatch(setClearData());
    dispatch(setClearSearchResults());
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex flex-row items-center h-16 border-b border-gray-300 px-2">
        <Navigation
          backBtnDisabled={previousStates.length === 0}
          nextBtnDisabled={nextStates.length === 0}
          onBackClick={handlePreviousClick}
          onNextClick={handleNextClick}
          onHomeClick={handleHomeClick}
        />
        <Search query={currentRepositoryData.html_url || ""} />
      </div>
      <div className="flex flex-grow flex-row justify-center p-[52px]">
        {currentRepositoryData.html_url ? (
          <RepoCard data={currentRepositoryData} />
        ) : (
          <img src="/icons/homepage.png" width="700px" height="500px" alt="" />
        )}
      </div>
    </div>
  );
}

export default App;
