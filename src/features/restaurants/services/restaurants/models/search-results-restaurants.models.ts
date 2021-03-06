export interface SearchResultsRestaurants {
  _id: string;
  _index: string;
  _score: number;
  _source: SourceSearchResultsRestaurants;
}

export interface SourceSearchResultsRestaurants {
  address: string;
  ambiancetypes: number;
  amenitytypes: number;
  audiotrack: string;
  cityid: number;
  countryid: number;
  cuisinetypes: number;
  description: string;
  hasfreespace: boolean;
  hasoutdoor: boolean;
  hasshisha: boolean;
  id: number;
  is24hour: boolean;
  isalcoholfree: boolean;
  isfeatured: boolean;
  issmokefree: boolean;
  keywords: Array<string>;
  latitude: number;
  logoimage: string;
  longitude: number;
  musictypes: number;
  name: string;
  nameinbrand: string;
  parkingtypes: number;
  rank: number;
  regionid: number;
  restauranttypes: number;
  status: number;
  ambiance_rate: number;
  brandid: number;
  coverimage: string;
  featuredsequence: number;
  food_rate: number;
  managerid: number;
  noise_level: number;
  phonenumber: string;
  rated_by: number;
  restaurant_rate: number;
  service_rate: number;
  services: Array<string>;
  shisha_rate: number;
  tel: string;
}
