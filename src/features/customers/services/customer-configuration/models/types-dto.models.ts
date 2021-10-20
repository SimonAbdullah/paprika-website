import { EnumValue } from "./enum-value.models";

export interface TypesDto {
  musicTypes?: Array<EnumValue>;
  cuisineTypes?: Array<EnumValue>;
  amenityTypes?: Array<EnumValue>;
  ambianceTypes?: Array<EnumValue>;
  parkingTypes?: Array<EnumValue>;
  noiseLevels?: Array<EnumValue>;
  restaurantTypes?: Array<EnumValue>;
  reservationStatus?: Array<EnumValue>;
  pickupStatus?: Array<EnumValue>;
  deliveryStatus?: Array<EnumValue>;
}
