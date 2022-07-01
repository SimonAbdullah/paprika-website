import {
  IBaseApiResponse,
  PagedResultDto,
} from "../../../../utils/base-api/api-provider";
import ApiService from "../../../../utils/base-api/api-service";
import { CustomerEventDetailsParamsDto } from "./models/customer-event-details-params-dto.models";
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

  public getEvent(
    params: CustomerEventDetailsParamsDto
  ): Promise<IBaseApiResponse<CustomerEventDto>> {
    return this.get("/Get", { params: params });
  }
  
}

export const customerEventServices = new CustomerEventServices();
