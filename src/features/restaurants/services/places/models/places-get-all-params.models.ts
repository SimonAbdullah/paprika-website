export interface PlacesGetAllParams {
  parkingType?: number;
  ambianceType?: number;
  musicType?: number;
  cuisineTypes?: number;
  amenityTypes?: number;
  restaurantTypes?: number;
  isFeatured?: boolean;
  isSmokeFree?: boolean;
  isAlcoholFree?: boolean;
  is24Hour?: boolean;
  hasShisha?: boolean;
  hasOutdoor?: boolean;
  hasReservation?: boolean;
  hasDelivery?: boolean;
  hasPickup?: boolean;
  longitude?: number;
  latitude?: number;
  cityId?: number;
  countryId?: number;
  regionId?: number;
  skipCount?: number;
  maxResultCount?: number;
  RestaurantName?: string;
}
