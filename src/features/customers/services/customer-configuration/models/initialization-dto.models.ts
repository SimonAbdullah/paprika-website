import { PagedResultDto } from "../../../../../utils/base-api/api-provider";
import { ConfigurationCityDto } from "./configuration-city-dto.models";
import { ConfigurationCountryDto } from "./configuration-country-dto.models";
import { ConfigurationRegionDto } from "./configuration-region-dto.models";
import { CustomerInfoDto } from "./customerInfo-dto.models";
import { TypesDto } from "./types-dto.models";

export interface InitializationDto {
  isAuthorized?: boolean;
  cities?: PagedResultDto<ConfigurationCityDto>;
  countries?: PagedResultDto<ConfigurationCountryDto>;
  regions?: PagedResultDto<ConfigurationRegionDto>;
  customerInfo?: CustomerInfoDto;
  types?: TypesDto;
  typesHash?: number;
  regionsHash?: number;
  countriesHash?: number;
  citiesHash?: number;
  unreadNotificationsCount?: number;
}
