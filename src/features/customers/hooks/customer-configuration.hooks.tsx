import { useQuery, UseQueryOptions } from "react-query";
import { customerConfigurationServices } from "../services/customer-configuration/customer-configuration.services";
import { GetInitialConfigurationsParams } from "../services/customer-configuration/models/get-initial-configurations-params.models";
import { InitializationDto } from "../services/customer-configuration/models/initialization-dto.models";

export const useCustomerConfiguration = (
  params?: GetInitialConfigurationsParams,
  options?: UseQueryOptions<InitializationDto, unknown, InitializationDto>
) => {
  const result = useQuery(
    ["CustomerConfigurationTypes"],
    async () =>
      (
        await customerConfigurationServices.getInitialConfigurations({
          ...params,
        })
      ).result,
    {
      ...options,
    }
  );

  return {
    ...result,
    types: result.data?.types,
    countries: result.data?.countries,
    cities: result.data?.cities,
    regions: result.data?.regions,
  };
};

export const useCities = (countryId?: number) => {
  const { cities } = useCustomerConfiguration();

  return {
    cities: cities?.items.filter((city) => city.countryId === countryId),
  };
};

export const useRegions = (cityId?: number) => {
  const { regions } = useCustomerConfiguration();

  return {
    regions: regions?.items.filter((region) => region.cityId === cityId),
  };
};
