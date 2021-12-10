export interface ServiceDto {
  id?: number;
  name: string;
  code: string;
}

export enum ServicesCodeEnum {
  RESERVATION = "reservation",
  DELIVERY = "delivery",
  PICKUP = "pickup",
}
