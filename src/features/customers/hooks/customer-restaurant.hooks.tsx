import { useRouter } from "next/dist/client/router";
import { useQuery, UseQueryOptions } from "react-query";
import { customerRestaurantServices } from "../services/customer-restaurant/customer-restaurant.services";
import { CustomerRestaurantParams } from "../services/customer-restaurant/models/customer-restaurant-params.models";
import { RestaurantHomeDto } from "../services/customer-restaurant/models/restaurantHomeDto";

export const useRestaurantDetails = (
  params?: CustomerRestaurantParams,
  options?: UseQueryOptions<RestaurantHomeDto, unknown, RestaurantHomeDto>
) => {
  const { query: urlQuery, isFallback } = useRouter();

  const result = useQuery(
    `restaurantDetails${urlQuery?.restaurantId || params?.Id}`,
    async () =>
      (
        await customerRestaurantServices.getDetails({
          Id: Number(urlQuery?.restaurantId) || params?.Id,
        })
      ).result,
    options
  );

  const galleryItems = result.data?.galleryItems;

  const openingTimes = result.data?.openingTimes;

  return {
    ...result,
    isLoading: (!result.data && !result.error) || isFallback,
    galleryItems,
    openingTimes,
  };
};
