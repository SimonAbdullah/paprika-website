import { useContext } from "react";
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";
import {
  RESTAURANTS_INITIAL_PLACES_API_PARAMS,
  SORT_IN_ELASTICSEARCH,
} from "../constants/restaurants.constants";
import { RestaurantsListContext } from "../contexts/restaurants-list.contexts";
import { BaseApiSearchResponse } from "../services/restaurants/models/base-api-search-response.models";
import { restaurantsServices } from "../services/restaurants/restaurants.services";

export const useFeaturedPlaces = (
  options?: UseQueryOptions<
    BaseApiSearchResponse,
    unknown,
    BaseApiSearchResponse
  >
) => {
  return useQuery(
    "featuredPlaces",
    async () =>
      await restaurantsServices.getAll({
        sort: [SORT_IN_ELASTICSEARCH.SORT],
        query: {
          bool: {
            must: [
              {
                term: {
                  isfeatured: true,
                },
              },
            ],
          },
        },
      }),
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
  const { elasticSearchOptions } = useContext(RestaurantsListContext);

  return useInfiniteQuery(
    ["infinityPlaces", elasticSearchOptions],
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
            must: elasticSearchOptions,
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
