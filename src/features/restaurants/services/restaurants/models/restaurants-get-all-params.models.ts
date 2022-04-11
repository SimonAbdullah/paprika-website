export interface RestaurantsGetAllParams {
  size: number;
  query: fuzzyRestaurants;
}

export interface fuzzyRestaurants {
  fuzzy: keywordsRestaurants;
}

export interface keywordsRestaurants {
  keywords: ValueRestaurants;
}

export interface ValueRestaurants {
  value: string;
}
