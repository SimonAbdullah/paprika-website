import { IBaseApiResponse } from "../../../../utils/base-api/api-provider";
import ApiService from "../../../../utils/base-api/api-service";
import { CustomerDownloadLinkDto } from "./models/customer-download-link-dto.models";
import { CustomerDownloadLinkParams } from "./models/customer-download-link-params.models";

class CustomerDownloadLinkServices extends ApiService {
    constructor() {
        super({
            baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/Customer`,
        });
    }

    public getCustomerDownloadLink(params: CustomerDownloadLinkParams): Promise<IBaseApiResponse<CustomerDownloadLinkDto>>{
        return this.get("/GeneratePaprikaCustomerDownloadLink", { params: params });
    }
}

export const customerDownloadLinkServices = new CustomerDownloadLinkServices();