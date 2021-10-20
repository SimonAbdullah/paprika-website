import { IBaseApiResponse } from "../../../../utils/base-api/api-provider";
import ApiService from "../../../../utils/base-api/api-service";
import { GetInitialConfigurationsParams } from "./models/get-initial-configurations-params.models";
import { InitializationDto } from "./models/initialization-dto.models";

class CustomerConfigurationServices extends ApiService {
  constructor() {
    super({
      baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/Customer/Configuration`,
    });
  }

  public getInitialConfigurations(
    params?: GetInitialConfigurationsParams
  ): Promise<IBaseApiResponse<InitializationDto>> {
    return this.get("/GetInitialConfigurations", { params: params });
  }
}

export const customerConfigurationServices =
  new CustomerConfigurationServices();
