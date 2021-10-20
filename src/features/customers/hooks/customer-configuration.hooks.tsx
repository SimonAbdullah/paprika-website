import { useQuery, UseQueryOptions } from "react-query";
import { customerConfigurationServices } from "../services/customer-configuration/customer-configuration.services";
import { GetInitialConfigurationsParams } from "../services/customer-configuration/models/get-initial-configurations-params.models";
import { InitializationDto } from "../services/customer-configuration/models/initialization-dto.models";

export const useCustomerConfigurationTypes = (
  params?: GetInitialConfigurationsParams,
  options?: UseQueryOptions<InitializationDto, unknown, InitializationDto>
) => {
  const result = useQuery(
    "CustomerConfigurationTypes",
    async () =>
      (
        await customerConfigurationServices.getInitialConfigurations({
          RegionsHash: 1577890399,
          CountriesHash: 957836664,
          CitiesHash: 3796738168,
          ...params,
        })
      ).result,
    {
      ...options,
    }
  );

  return result;
};
