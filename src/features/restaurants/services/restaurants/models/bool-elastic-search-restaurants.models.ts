export interface BoolElasticSearchRestaurants {
  must: MustElasticSearchRestaurants[];
}

export interface MustElasticSearchRestaurants {
  match?: keywordsElasticSearchRestaurants;
  term?: any;
}

export interface keywordsElasticSearchRestaurants {
  keywords: any;
}
