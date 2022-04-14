import { useRouter } from "next/dist/client/router";
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
import { restaurantsServices } from "../services/restaurants/restaurants.services";

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
      (await placesServices.getAll({ isFeatured: true, ...params })).result,
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
  const { query } = useRouter();
  const { options1 } = useContext(RestaurantsListContext);

  const result = useInfiniteQuery(
    ["infinityPlaces", query],
    async ({ pageParam }) => {
      const skip =
        !pageParam || pageParam === 1
          ? 0
          : (pageParam - 1) *
            RESTAURANTS_INITIAL_PLACES_API_PARAMS.MaxRestaurantsPerPage;
      console.log("query", query);
      console.log("options1", options1);
      const result = await placesServices.getAll({
        skipCount: skip,
        maxResultCount:
          RESTAURANTS_INITIAL_PLACES_API_PARAMS.MaxRestaurantsPerPage,
        ...query,
        ...params,
      });
      let restaurants = await restaurantsServices.getAll({
        size: RESTAURANTS_INITIAL_PLACES_API_PARAMS.MaxRestaurantsPerPage,
        query: {
          bool: {
            must: options1,
          },
        },
        from: RESTAURANTS_INITIAL_PLACES_API_PARAMS.StartFromRestaurant,
      });
      console.log(restaurants.hits.hits);
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
