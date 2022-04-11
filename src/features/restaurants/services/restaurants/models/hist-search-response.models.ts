import { SearchResultsRestaurants } from "./search-results-restaurants.models";

export interface HistSearchResponse {
  max_score: number;
  total: totalHistResponse;
  hits: SearchResultsRestaurants[];
}

export interface totalHistResponse {
  relation: string;
  value: number;
}
