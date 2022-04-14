import { BoolElasticSearchRestaurants } from "./bool-elastic-search-restaurants.models";

export interface RestaurantsGetAllParams {
  size: number;
  from?: number;
  query: QueryElasticSearchRestaurants;
}

export interface QueryElasticSearchRestaurants {
  fuzzy?: FuzzyElasticSearchRestaurants;
  match_all?: any;
  bool?: BoolElasticSearchRestaurants;
}
export interface FuzzyElasticSearchRestaurants {
  keywords: ValueElasticSearchRestaurants;
}

export interface ValueElasticSearchRestaurants {
  value: string;
}
