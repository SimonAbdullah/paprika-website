import { CityDto } from "../../../../restaurants/services/places/models/city-dto.models";
import { CountryDto } from "../../../../restaurants/services/places/models/country-dto";
import { RegionDto } from "../../../../restaurants/services/places/models/region-dto";

export interface CustomerEventDto {
  name?: string;
  restaurantId?: number;
  restaurantName?: string;
  restaurantImage?: string;
  restaurantRate?: number;
  totalRestaurantRatersCount?: number;
  restaurantAddress?: string;
  city?: CityDto;
  country?: CountryDto;
  region?: RegionDto;
  isActive?: boolean;
  image?: string;
  thumbnailImage?: string;
  description?: string;
  time?: Date;
  isReservable?: boolean;
  maxPeopleAllowed?: number;
  id?: number;
}
