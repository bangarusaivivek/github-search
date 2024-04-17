import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "../../../../utils";
import { fetchRepositories } from "../../../../services";
import { RootState, setClearSearchResults } from "../../../../store";
import useInfiniteScroll from "../../../../hooks/useInfiniteScroll";
import { RepositoryData } from "../../../../store/Home/typings";
import {
  setCurrentRepository,
  setRecentSearchStrings,
  setRepositoryLoading,
} from "../../../../store/Home/repositoryDataSlice";
import { DropdownItem } from "../DropdownItem";
import { SearchProps } from "./typings";

const Search = (props: SearchProps) => {
  const { query } = props;
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState(query || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { results, loading, page, totalCount } = useSelector(
    (state: RootState) => state.searchData
  );
  const { recentSearchStrings } = useSelector(
    (state: RootState) => state.repositoryData
  );
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    // Function to close dropdown when clicking outside the input or dropdown
    const handleClickOutside = (event: any) => {
      if (
        !event.target.id.includes("search-input") &&
        !event.target.id.includes("dropdown-prefill")
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const fetchMoreResults = () => {
    dispatch(
      fetchRepositories({
        q: searchQuery,
        page: page + 1,
        per_page: 15,
      })
    );
  };

  // Custom hook for infinite scrolling
  useInfiniteScroll(
    parentRef,
    fetchMoreResults,
    loading || results.length >= totalCount
  );

  // Debounced search function to avoid triggering search on every keystroke
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      dispatch(
        fetchRepositories({
          q: query,
          page: 1,
          per_page: 15,
        })
      );
    }, 300),
    []
  );

  const handleSearchChange = (value: string, isOpen = false) => {
    const query = value.trimStart();
    setSearchQuery(query);

    if (isOpen) {
      setShowDropdown(true);
    }
    if (query) {
      debouncedSearch(query);
    } else if (results.length > 0) {
      dispatch(setClearSearchResults());
    }
  };

  const handleSelectedRepository = useCallback(
    (data: RepositoryData) => {
      setShowDropdown(false);
      dispatch(setRecentSearchStrings(searchQuery));
      setSearchQuery(data.html_url);
      dispatch(setRepositoryLoading(true));
      dispatch(setCurrentRepository(data));
      dispatch(setClearSearchResults());
    },
    [dispatch, searchQuery]
  );

  const handleKeyDown = useCallback(
    (event: any) => {
      if (event.key === "ArrowDown") {
        // Move selection down
        setSelectedIndex((prevIndex) =>
          prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (event.key === "ArrowUp") {
        // Move selection up
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      } else if (event.key === "Enter" && selectedIndex !== -1) {
        // Confirm selection
        handleSelectedRepository(results[selectedIndex]);
      }
    },
    [handleSelectedRepository, results, selectedIndex]
  );

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  return (
    <>
      <div className="relative w-full px-[16px] max-w-[1200px]">
        <div className={`${showDropdown ? "h-[60px]" : "h-[36px]"}`}>
          <div
            className={`${
              showDropdown ? "w-[50px]" : "w-[36px]"
            } absolute h-full  flex justify-center items-center`}
          >
            <img
              src="/icons/google-round.svg"
              height="20px"
              width="20px"
              alt="G"
            />
          </div>

          <input
            type="text"
            id="search-input"
            className={`${
              showDropdown
                ? "pl-[50px] bg-white shadow rounded-bl-none rounded-br-none"
                : "pl-[42px]"
            } w-full h-full pl-[42px] pr-[36px] rounded-[18px] bg-gray-200 text-gray-900 placeholder-gray-700 outline-none focus:text-black focus:rounded-bl-none focus:rounded-br-none focus:shadow`}
            placeholder="Search Voogle or type a URL"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="relative w-full">
          {showDropdown ? (
            <div
              ref={parentRef}
              className="absolute w-full max-h-[324px] bg-white rounded-b-lg overflow-y-scroll flex flex-col pr-[16px] shadow-md"
            >
              {!searchQuery && recentSearchStrings.length > 0 ? (
                <>
                  {recentSearchStrings.map((item, index) => {
                    return (
                      <div
                        key={`${item}-${index}`}
                        id={`dropdown-prefill-${index}`}
                        className="w-full flex flex-row items-center min-h-[40px] pl-[16px] rounded-r-[20px] hover:bg-gray-200"
                        onClick={() => handleSearchChange(item, true)}
                      >
                        <img
                          id={`dropdown-prefill-${index}-img`}
                          src="/icons/search.svg"
                          alt=""
                          height="20px"
                          width="20px"
                        />
                        <div
                          id={`dropdown-prefill-${index}-item`}
                          className="mr-[4px] ml-[16px] text-[14px] font-bold whitespace-no-wrap"
                        >
                          {item}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  {results.map((item, index) => {
                    return (
                      <DropdownItem
                        key={item.html_url}
                        data={item}
                        onItemClick={handleSelectedRepository}
                        isSelected={selectedIndex === index}
                      />
                    );
                  })}
                </>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Search;
