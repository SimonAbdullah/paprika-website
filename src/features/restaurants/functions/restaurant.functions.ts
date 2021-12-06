import { CityDto } from "../services/places/models/city-dto.models";
import { CountryDto } from "../services/places/models/country-dto";
import { PlacesGetAllParams } from "../services/places/models/places-get-all-params.models";
import { RegionDto } from "../services/places/models/region-dto";

export const restaurantAddressDetails = ({
  country,
  city,
  region,
}: {
  country?: CountryDto;
  city?: CityDto;
  region?: RegionDto;
}) => {
  if (country?.name && city?.name && region?.name) {
    return `${country.name}, ${city.name}, ${region.name}`;
  } else if (country?.name && city?.name) {
    return `${country.name}, ${city.name}`;
  } else if (city?.name && region?.name) {
    return `${city.name}, ${region.name}`;
  } else if (country?.name && region?.name) {
    return `${country.name}, ${region.name}`;
  } else if (country?.name) {
    return country.name;
  } else if (city?.name) {
    return city.name;
  } else if (region?.name) {
    return region?.name;
  } else {
    return "";
  }
};
