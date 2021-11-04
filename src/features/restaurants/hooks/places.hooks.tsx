import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";
import { PagedResultDto } from "../../../utils/base-api/api-provider";
import { RESTAURANTS_INITIAL_PLACES_API_PARAMS } from "../constants/restaurants.constants";
import { PlacesGetAllParams } from "../services/places/models/places-get-all-params.models";
import { RestaurantSummaryDto } from "../services/places/models/restaurant-summary-dto.models";
import { placesServices } from "../services/places/places.services";

export const useFeaturedPlaces = (
  params?: PlacesGetAllParams,
  options?: UseQueryOptions<
    PagedResultDto<RestaurantSummaryDto>,
    unknown,
    PagedResultDto<RestaurantSummaryDto>
  >
) => {
  const result = useQuery(
    "featuredPlaces",
    async () =>
      (await placesServices.getAll({ IsFeatured: true, ...params })).result,
    options
  );

  return result;
};

export const useInfinityPlaces = (
  params?: PlacesGetAllParams,
  options?: UseInfiniteQueryOptions<
    PagedResultDto<RestaurantSummaryDto>,
    unknown,
    PagedResultDto<RestaurantSummaryDto>
  >
) => {
  const result = useInfiniteQuery(
    "infinityPlaces",
    async ({ pageParam }) => {
      const skip =
        !pageParam || pageParam === 1
          ? 0
          : (pageParam - 1) *
            RESTAURANTS_INITIAL_PLACES_API_PARAMS.MaxRestaurantsPerPage;

      const result = await placesServices.getAll({
        SkipCount: skip,
        MaxResultCount:
          RESTAURANTS_INITIAL_PLACES_API_PARAMS.MaxRestaurantsPerPage,
        ...params,
      });

      return result.result;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.totalCount >
          allPages.length *
            RESTAURANTS_INITIAL_PLACES_API_PARAMS.MaxRestaurantsPerPage
          ? allPages.length + 1
          : undefined;
      },
      getPreviousPageParam: (_, allPages) => {
        return allPages.length > 1 ? allPages.length - 1 : undefined;
      },
      ...options,
    }
  );

  return result;
};
