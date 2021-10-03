import { useQuery, UseQueryOptions } from "react-query";
import { PagedResultDto } from "../../../utils/base-api/api-provider";
import { PlacesGetAllParams } from "../services/models/places-get-all-params.models";
import { RestaurantSummaryDto } from "../services/models/restaurant-summary-dto.models";
import { placesServices } from "../services/places.services";

export const usePlaces = (
  params?: PlacesGetAllParams,
  options?: UseQueryOptions<
    PagedResultDto<RestaurantSummaryDto>,
    unknown,
    PagedResultDto<RestaurantSummaryDto>
  >
) => {
  const result = useQuery(
    "places",
    async () => (await placesServices.getAll(params)).result,
    options
  );

  return result;
};
