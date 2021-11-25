import { useRouter } from "next/dist/client/router";
import { useQuery, UseQueryOptions } from "react-query";
import { customerMenuServices } from "../services/customer-menu/customer-menu.components";
import { CategoryDto } from "../services/customer-menu/models/category-dto.models";
import { CustomerMenuParams } from "../services/customer-menu/models/customer-menu-params.models";
import { MealDto } from "../services/customer-menu/models/meal-dto.models";
import { useRestaurantDetails } from "./customer-restaurant.hooks";

export const useRestaurantCategories = (
  params?: CustomerMenuParams,
  options?: UseQueryOptions<CategoryDto[], unknown, CategoryDto[]>
) => {
  const { isFallback } = useRouter();

  const { data } = useRestaurantDetails();

  const result = useQuery(
    `restaurantCategories${data?.id || params?.Id}`,
    async () =>
      (
        await customerMenuServices.getRestaurantCategories({
          Id: Number(data?.id) || params?.Id,
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
