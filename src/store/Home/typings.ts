export interface SearchDataState {
  results: RepositoryData[];
  loading: boolean;
  page: number;
  totalCount: number;
}

export interface SearchResultResponse {
  incomplete_results: boolean;
  items: RepositoryData[];
  total_count: number;
  page: number;
}

export interface RepositoryDataState {
  currentRepositoryData: RepositoryData;
  loading: boolean;
  isDataPresent: boolean;
  recentSearchStrings: Array<string>;
  previousStates: Array<RepositoryData>;
  nextStates: Array<RepositoryData>;
}

export type RepositoryData = {
  id: number;
  full_name: string;
  html_url: string;
  private: boolean;
  description: string;
  updated_at: string;
  language: string;
  forks: number;
  stargazers_count: number;
  name: string;
};
