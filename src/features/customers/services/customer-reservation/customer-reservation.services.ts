import { IBaseApiResponse } from "../../../../utils/base-api/api-provider";
import ApiService from "../../../../utils/base-api/api-service";
import { CreateReservationForGuestDto } from "./models/create-reservation-for-guest-dto.models";
import { MassageDto } from "./models/massage-dto";

class CustomerReservationServices extends ApiService {
  constructor() {
    super({
      baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/Customer/Reservation`,
    });
  }

  public createForGuest(
    data: CreateReservationForGuestDto
  ): Promise<IBaseApiResponse<MassageDto>> {
    return this.post("/CreateForGuest", data);
  }
}

export const customerReservationServices = new CustomerReservationServices();
