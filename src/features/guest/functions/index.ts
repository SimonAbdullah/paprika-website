import { customerReservationServices } from "../../customers/services/customer-reservation/customer-reservation.services";
import { CreateReservationForGuestDto } from "../../customers/services/customer-reservation/models/create-reservation-for-guest-dto.models";
import { guestServices } from "../services";

export const sendAndResendVerificationCode = async (
  phoneNumber: string,
  key: string
) => {
  return await guestServices.requestAndResendVerificationCode({
    phoneNumber: phoneNumber,
    key: key,
  });
};

export const createReservation = async (data: CreateReservationForGuestDto) => {
  return await customerReservationServices.createForGuest(data);
};
