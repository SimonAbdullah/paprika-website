export interface CreateReservationDto {
  restaurantId: number;
  numberOfPeople: number;
  time: string;
  date: string;
  customerAdditionalInfo: string;
  phoneNumber: string;
  occasionType: number;
  personName: string;
}
