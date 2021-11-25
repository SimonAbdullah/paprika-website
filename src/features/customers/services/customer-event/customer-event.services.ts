import {
  IBaseApiResponse,
  PagedResultDto,
} from "../../../../utils/base-api/api-provider";
import ApiService from "../../../../utils/base-api/api-service";
import { CustomerEventDto } from "./models/customer-event-dto.models";
import { CustomerEventParams } from "./models/customer-event-params.models";

class CustomerEventServices extends ApiService {
  constructor() {
    super({
      baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/Customer/Event`,
    });
  }

  public getAllUpcomingEvent(
    params: CustomerEventParams
  ): Promise<IBaseApiResponse<PagedResultDto<CustomerEventDto>>> {
    return this.get("/GetAllUpcoming", { params: params });
  }
}

export const customerEventServices = new CustomerEventServices();
