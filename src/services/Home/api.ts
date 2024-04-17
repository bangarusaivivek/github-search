import Axios from "axios";
import { SearchQueryProps } from "./typings";
import { getSearchUrl } from "./urlHelper";
import { setSearchLoading, setSearchResults } from "../../store";
import { SearchResultResponse } from "../../store/Home/typings";

export const fetchRepositories =
  (params: SearchQueryProps): any =>
  async (dispatch: any) => {
    try {
      dispatch(setSearchLoading(true));
      const { data } = await Axios.get(getSearchUrl(), {
        params,
      });

      const updatedData: SearchResultResponse = {
        ...data,
        page: params.page,
      };
      dispatch(setSearchResults(updatedData));
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };
