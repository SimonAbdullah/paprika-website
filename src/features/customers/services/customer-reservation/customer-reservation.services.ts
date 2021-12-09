import { IBaseApiResponse } from "../../../../utils/base-api/api-provider";
import ApiService from "../../../../utils/base-api/api-service";
import { CreateReservationDto } from "./models/create-reservation-dto.models";
import { MassageDto } from "./models/massage-dto";

class CustomerReservationServices extends ApiService {
  constructor() {
    super({
      baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/Customer/Reservation`,
    });
  }

  public create(
    data: CreateReservationDto
  ): Promise<IBaseApiResponse<MassageDto>> {
    return this.post("/CreateReservation", data);
  }
}

export const customerReservationServices = new CustomerReservationServices();
