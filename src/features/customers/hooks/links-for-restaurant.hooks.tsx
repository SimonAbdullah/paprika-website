import { useQuery, UseQueryOptions } from "react-query";
import { linksServices } from "../../restaurants/services/links/links.services";
import { RestaurantDto } from "../../restaurants/services/links/models/restaurant-dto";

export const useRestaurantLinkInformation = (
  id?: number,
  options?: UseQueryOptions<RestaurantDto, unknown, RestaurantDto>
) => {
  return useQuery(
    `RestaurantLink${id}`,
    async () =>
      (
        await linksServices.getForRestaurant({
          restaurantId: id,
        })
      ).result,
    options
  );
};
