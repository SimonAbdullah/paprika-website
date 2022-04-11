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
  hasfreespace: false;
  hasoutdoor: true;
  hasshisha: true;
  id: number;
  is24hour: false;
  isalcoholfree: true;
  isfeatured: true;
  issmokefree: true;
  keywords: string[];
  latitude: number;
  logoimage: string;
  longitude: number;
  musictypes: number;
  name: string;
  nameinbrand: string;
  parkingtypes: number;
  rank: null;
  regionid: number;
  restauranttypes: number;
  status: number;
}
