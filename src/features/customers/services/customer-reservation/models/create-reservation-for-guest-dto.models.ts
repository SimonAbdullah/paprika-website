export interface CreateReservationForGuestDto {
  restaurantId: number;
  numberOfPeople: number;
  dateAndTime: string;
  customerAdditionalInfo: string;
  phoneNumber: string;
  occasionType: number;
  personName: string;
  verficationCode: string;
  key: string;
}
