import { DeliveryRegionDto } from "./deliveryRegionDto";
import { ServiceDto } from "./serviceDto";

export interface RestaurantSettingsDto {
  services?: Array<ServiceDto>;
  deliveryRegions?: Array<DeliveryRegionDto>;
  maxPeopleAllowed?: number;
}
