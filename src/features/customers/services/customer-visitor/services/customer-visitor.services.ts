import { IBaseApiResponse } from "../../../../../utils/base-api/api-provider";
import ApiService from "../../../../../utils/base-api/api-service";
import { CreateVisitorContactInfoDto } from "./models/create-visitor-contact-info-dto.models";

class CustomerVisitorServices extends ApiService {
  constructor() {
    super({
      baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/Customer/Visitor`,
    });
  }

  public create(
    data: CreateVisitorContactInfoDto
  ): Promise<IBaseApiResponse<unknown>> {
    return this.post("/Create", data);
  }
}

export const customerVisitorServices = new CustomerVisitorServices();
