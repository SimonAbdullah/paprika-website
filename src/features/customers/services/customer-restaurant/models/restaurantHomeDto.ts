import { CityDto } from "../../../../restaurants/services/places/models/city-dto.models";
import { CountryDto } from "../../../../restaurants/services/places/models/country-dto";
import { RegionDto } from "../../../../restaurants/services/places/models/region-dto";
import { GalleryItemDto } from "./galleryItemDto";
import { OpeningTimeDto } from "./openingTimeDto";
import { RestaurantEventDto } from "./restaurantEventDto";
import { RestaurantLatestOfferDto } from "./restaurantLatestOfferDto";
import { RestaurantRatersDto } from "./restaurantRatersDto";
import { RestaurantSettingsDto } from "./restaurantSettingsDto";

export interface RestaurantHomeDto {
  restaurantRate?: number;
  foodRate?: number;
  serviceRate?: number;
  shishaRate?: number;
  noiseLevel?: RestaurantHomeDto.NoiseLevelEnum;
  ambianceRate?: number;
  isFavorite?: boolean;
  city?: CityDto;
  country?: CountryDto;
  region?: RegionDto;
  event?: RestaurantEventDto;
  openingTimes?: Array<OpeningTimeDto>;
  galleryItems?: Array<GalleryItemDto>;
  restaurantRaters?: RestaurantRatersDto;
  settings?: RestaurantSettingsDto;
  latestOffer?: RestaurantLatestOfferDto;
  name?: string;
  longitude?: number;
  latitude?: number;
  logoImage?: string;
  coverImage?: string;
  phoneNumber?: string;
  tel?: string;
  rank?: number;
  address?: string;
  regionId?: number;
  status?: number;
  parkingTypes?: RestaurantHomeDto.ParkingTypesEnum;
  description?: string;
  ambianceTypes?: RestaurantHomeDto.AmbianceTypesEnum;
  restaurantTypes?: RestaurantHomeDto.RestaurantTypesEnum;
  audioTrack?: string;
  musicTypes?: RestaurantHomeDto.MusicTypesEnum;
  isSmokeFree?: boolean;
  hasShisha?: boolean;
  isAlcoholFree?: boolean;
  cuisineTypes?: RestaurantHomeDto.CuisineTypesEnum;
  amenityTypes?: RestaurantHomeDto.AmenityTypesEnum;
  hasOutdoor?: boolean;
  isFeatured?: boolean;
  is24Hour?: boolean;
  isOpen?: boolean;
  isActive?: boolean;
  isNotificationsOn?: boolean;
  id?: number;
}
export namespace RestaurantHomeDto {
  export type NoiseLevelEnum = 1 | 2 | 3;
  export const NoiseLevelEnum = {
    LOW: 1 as NoiseLevelEnum,
    MODERATE: 2 as NoiseLevelEnum,
    HIGH: 3 as NoiseLevelEnum,
  };
  export type ParkingTypesEnum = 1 | 2 | 4;
  export const ParkingTypesEnum = {
    GARAGE: 1 as ParkingTypesEnum,
    VALET: 2 as ParkingTypesEnum,
    NONE: 4 as ParkingTypesEnum,
  };
  export type AmbianceTypesEnum = 1 | 2 | 4 | 8 | 15;
  export const AmbianceTypesEnum = {
    COZY: 1 as AmbianceTypesEnum,
    CLASSIC: 2 as AmbianceTypesEnum,
    MODERN: 4 as AmbianceTypesEnum,
    FAMILIAL: 8 as AmbianceTypesEnum,
    FOLK: 15 as AmbianceTypesEnum,
  };
  export type RestaurantTypesEnum = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128;
  export const RestaurantTypesEnum = {
    PIZZA_HOUSE: 1 as RestaurantTypesEnum,
    RESTAURANT: 2 as RestaurantTypesEnum,
    CAFE: 4 as RestaurantTypesEnum,
    FAST_FOOD: 8 as RestaurantTypesEnum,
    CHOCOLATE: 16 as RestaurantTypesEnum,
    SWEETS: 32 as RestaurantTypesEnum,
    PATISSERIE: 64 as RestaurantTypesEnum,
    BAR: 128 as RestaurantTypesEnum,
  };
  export type MusicTypesEnum = 1 | 2 | 4 | 8;
  export const MusicTypesEnum = {
    JAZZ: 1 as MusicTypesEnum,
    BLUES: 2 as MusicTypesEnum,
    OLDIES: 4 as MusicTypesEnum,
    POP: 8 as MusicTypesEnum,
  };
  export type CuisineTypesEnum = 1 | 2 | 4 | 8;
  export const CuisineTypesEnum = {
    CHINESE: 1 as CuisineTypesEnum,
    ITALIAN: 2 as CuisineTypesEnum,
    WESTERN: 4 as CuisineTypesEnum,
    EASTERN: 8 as CuisineTypesEnum,
  };
  export type AmenityTypesEnum = 1 | 2;
  export const AmenityTypesEnum = {
    SWINGS: 1 as AmenityTypesEnum,
    SWIMMING_POOL: 2 as AmenityTypesEnum,
  };
}
