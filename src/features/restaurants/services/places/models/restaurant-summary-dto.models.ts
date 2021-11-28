import { CityDto } from "./city-dto.models";
import { CountryDto } from "./country-dto";
import { RegionDto } from "./region-dto";

export interface RestaurantSummaryDto {
  name?: string;
  restaurantTypes?: any;
  address?: string;
  logoImage?: string;
  restaurantRate?: number;
  foodRate?: number;
  serviceRate?: number;
  shishaRate?: number;
  ambianceRate?: number;
  noiseLevel?: any;
  totalRestaurantRatersCount?: number;
  longitude?: number;
  latitude?: number;
  city?: CityDto;
  country?: CountryDto;
  region?: RegionDto;
  isOpen?: boolean;
  phoneNumber?: string;
  tel?: string;
  hasShisha?: boolean;
  id?: number;
}
