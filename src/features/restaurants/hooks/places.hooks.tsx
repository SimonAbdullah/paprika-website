import { useContext } from "react";
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";
import { PagedResultDto } from "../../../utils/base-api/api-provider";
import { RESTAURANTS_INITIAL_PLACES_API_PARAMS } from "../constants/restaurants.constants";
import { RestaurantsListContext } from "../contexts/restaurants-list.contexts";
import { PlacesGetAllParams } from "../services/places/models/places-get-all-params.models";
import { RestaurantSummaryDto } from "../services/places/models/restaurant-summary-dto.models";
import { placesServices } from "../services/places/places.services";
import { BaseApiSearchResponse } from "../services/restaurants/models/base-api-search-response.models";
import { restaurantsServices } from "../services/restaurants/restaurants.services";

export const useFeaturedPlaces = (
  params?: PlacesGetAllParams,
  options?: UseQueryOptions<
    PagedResultDto<RestaurantSummaryDto>,
    unknown,
    PagedResultDto<RestaurantSummaryDto>
  >
) => {
  return useQuery(
    "featuredPlaces",
    async () =>
      (await placesServices.getAll({ isFeatured: true, ...params })).result,
    options
  );
};

export const useInfinityPlaces = (
  options?: UseInfiniteQueryOptions<
    BaseApiSearchResponse,
    unknown,
    BaseApiSearchResponse
  >
) => {
  const { options1 } = useContext(RestaurantsListContext);

  return useInfiniteQuery(
    ["infinityPlaces", options1],
    async ({ pageParam }) => {
      const skip =
        !pageParam || pageParam === 1
          ? 0
          : (pageParam - 1) *
            RESTAURANTS_INITIAL_PLACES_API_PARAMS.MaxRestaurantsPerPage;

      return await restaurantsServices.getAll({
        size: RESTAURANTS_INITIAL_PLACES_API_PARAMS.MaxRestaurantsPerPage,
        query: {
          bool: {
            must: options1,
          },
        },
        from: skip,
      });
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.hits.total.value >
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
};
