import { useRouter } from "next/dist/client/router";
import { useQuery, UseQueryOptions } from "react-query";
import { customerMenuServices } from "../services/customer-menu/customer-menu.components";
import { CategoryDto } from "../services/customer-menu/models/category-dto.models";
import { CustomerMenuParams } from "../services/customer-menu/models/customer-menu-params.models";
import { MealDto } from "../services/customer-menu/models/meal-dto.models";

export const useRestaurantCategories = (
  params?: CustomerMenuParams,
  options?: UseQueryOptions<CategoryDto[], unknown, CategoryDto[]>
) => {
  const { query: urlQuery, isFallback } = useRouter();

  const result = useQuery(
    `restaurantCategories${urlQuery?.restaurantId || params?.Id}`,
    async () =>
      (
        await customerMenuServices.getRestaurantCategories({
          Id: Number(urlQuery?.restaurantId) || params?.Id,
        })
      ).result,
    options
  );

  return {
    ...result,
    isLoading: (!result.data && !result.error) || isFallback,
  };
};

export const useRestaurantCategoryMeals = (
  params: CustomerMenuParams,
  options?: UseQueryOptions<MealDto[], unknown, MealDto[]>
) => {
  const { isFallback } = useRouter();

  const result = useQuery(
    `restaurantCategoryMeals${params?.Id}`,
    async () =>
      (
        await customerMenuServices.getRestaurantCategoryMeals({
          Id: Number(params?.Id),
        })
      ).result,
    options
  );

  return {
    ...result,
    isLoading: (!result.data && !result.error) || isFallback,
  };
};
