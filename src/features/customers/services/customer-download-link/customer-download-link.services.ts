import { IBaseApiResponse } from "../../../../utils/base-api/api-provider";
import ApiService from "../../../../utils/base-api/api-service";
import { CustomerDownloadLinkDto } from "./models/customer-download-link-dto.models";

class CustomerDownloadLinkServices extends ApiService {
    constructor() {
        super({
            baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/Customer`,
        });
    }

    public getCustomerDownloadLink(): Promise<IBaseApiResponse<CustomerDownloadLinkDto>>{
        return this.get("/GeneratePaprikaCustomerDownloadLink");
    }
}

export const customerDownloadLinkServices = new CustomerDownloadLinkServices();