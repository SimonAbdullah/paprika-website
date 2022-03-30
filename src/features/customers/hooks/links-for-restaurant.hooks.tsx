import { useQuery } from "react-query";
import { linksServices } from "../../restaurants/services/links/links.services";
import { useRestaurantDetails } from "./customer-restaurant.hooks";

export const useRestaurantLinkInformation = () => {
  const { data } = useRestaurantDetails();

  const result = useQuery(`RestaurantLink${data?.id}`, async () => {
    return (
      await linksServices.getForRestaurant({
        restaurantId: data?.id,
      })
    ).result;
  });
  return result;
};
