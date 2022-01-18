import { useRouter } from "next/dist/client/router";
import { useQuery, UseQueryOptions } from "react-query";
import { customerRestaurantServices } from "../services/customer-restaurant/customer-restaurant.services";
import { CustomerRestaurantParams } from "../services/customer-restaurant/models/customer-restaurant-params.models";
import { RestaurantHomeDto } from "../services/customer-restaurant/models/restaurantHomeDto";
import { ServicesCodeEnum } from "../services/customer-restaurant/models/serviceDto";

export const useRestaurantDetails = (
  params?: CustomerRestaurantParams,
  options?: UseQueryOptions<RestaurantHomeDto, unknown, RestaurantHomeDto>
) => {
  const { query: urlQuery, isFallback } = useRouter();

  const result = useQuery(
    `restaurantDetails${urlQuery?.restaurantName || params?.tenancyName}`,
    async () =>
      (
        await customerRestaurantServices.getDetails({
          tenancyName: String(urlQuery?.restaurantName) || params?.tenancyName,
        })
      ).result,
    options
  );

  const galleryItems = result.data?.galleryItems;

  const openingTimes = result.data?.openingTimes?.sort((a, b) => {
    if ((a.dayOfWeek || 0) > (b.dayOfWeek || 0)) {
      return 1;
    } else if ((a.dayOfWeek || 0) < (b.dayOfWeek || 0)) {
      return -1;
    } else return 0;
  });

  const hasReservation =
    result.data?.settings?.services?.findIndex(
      (service) => service.code === ServicesCodeEnum.RESERVATION
    ) !== -1;

  return {
    ...result,
    isLoading: (!result.data && !result.error) || isFallback,
    galleryItems,
    openingTimes,
    hasReservation,
  };
};
