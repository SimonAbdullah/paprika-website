export interface CustomerEventDto {
  name?: string;
  restaurantId?: number;
  restaurantName?: string;
  restaurantImage?: string;
  isActive?: boolean;
  image?: string;
  thumbnailImage?: string;
  description?: string;
  time?: Date;
  isReservable?: boolean;
  maxPeopleAllowed?: number;
  id?: number;
}
