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
    NUMBER_1: 1 as NoiseLevelEnum,
    NUMBER_2: 2 as NoiseLevelEnum,
    NUMBER_3: 3 as NoiseLevelEnum,
  };
  export type ParkingTypesEnum = 1 | 2 | 4;
  export const ParkingTypesEnum = {
    NUMBER_1: 1 as ParkingTypesEnum,
    NUMBER_2: 2 as ParkingTypesEnum,
    NUMBER_4: 4 as ParkingTypesEnum,
  };
  export type AmbianceTypesEnum = 1 | 2 | 4 | 8 | 15;
  export const AmbianceTypesEnum = {
    NUMBER_1: 1 as AmbianceTypesEnum,
    NUMBER_2: 2 as AmbianceTypesEnum,
    NUMBER_4: 4 as AmbianceTypesEnum,
    NUMBER_8: 8 as AmbianceTypesEnum,
    NUMBER_15: 15 as AmbianceTypesEnum,
  };
  export type RestaurantTypesEnum = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128;
  export const RestaurantTypesEnum = {
    NUMBER_1: 1 as RestaurantTypesEnum,
    NUMBER_2: 2 as RestaurantTypesEnum,
    NUMBER_4: 4 as RestaurantTypesEnum,
    NUMBER_8: 8 as RestaurantTypesEnum,
    NUMBER_16: 16 as RestaurantTypesEnum,
    NUMBER_32: 32 as RestaurantTypesEnum,
    NUMBER_64: 64 as RestaurantTypesEnum,
    NUMBER_128: 128 as RestaurantTypesEnum,
  };
  export type MusicTypesEnum = 1 | 2 | 4 | 8;
  export const MusicTypesEnum = {
    NUMBER_1: 1 as MusicTypesEnum,
    NUMBER_2: 2 as MusicTypesEnum,
    NUMBER_4: 4 as MusicTypesEnum,
    NUMBER_8: 8 as MusicTypesEnum,
  };
  export type CuisineTypesEnum = 1 | 2 | 4 | 8;
  export const CuisineTypesEnum = {
    NUMBER_1: 1 as CuisineTypesEnum,
    NUMBER_2: 2 as CuisineTypesEnum,
    NUMBER_4: 4 as CuisineTypesEnum,
    NUMBER_8: 8 as CuisineTypesEnum,
  };
  export type AmenityTypesEnum = 1 | 2;
  export const AmenityTypesEnum = {
    NUMBER_1: 1 as AmenityTypesEnum,
    NUMBER_2: 2 as AmenityTypesEnum,
  };
}
