import { RestaurantHomeDto } from "../../../../customers/services/customer-restaurant/models/restaurantHomeDto";

export interface PlacesGetAllParams {
  parkingType?: RestaurantHomeDto.ParkingTypesEnum;
  ambianceType?: RestaurantHomeDto.AmbianceTypesEnum;
  musicType?: RestaurantHomeDto.MusicTypesEnum;
  cuisineTypes?: RestaurantHomeDto.CuisineTypesEnum;
  amenityTypes?: RestaurantHomeDto.AmenityTypesEnum;
  restaurantTypes?: RestaurantHomeDto.RestaurantTypesEnum;
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
}
