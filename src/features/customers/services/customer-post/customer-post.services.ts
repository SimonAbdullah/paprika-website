import { IBaseApiResponse } from "../../../../utils/base-api/api-provider";
import ApiService from "../../../../utils/base-api/api-service";
import { CustomerPostDetailsParamsDto } from "./models/customer-post-details-params-dto.models";
import { CustomerPostDto } from "./models/customer-post-dto.models";

class CustomerPostServices extends ApiService {
    constructor() {
        super({
            baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/Customer/Offer`,
        });
    }

    public getPost(
        params: CustomerPostDetailsParamsDto
      ): Promise<IBaseApiResponse<CustomerPostDto>> {
        return this.get("/Get", { params: params });
    }
}

export const customerPostServices = new CustomerPostServices();
