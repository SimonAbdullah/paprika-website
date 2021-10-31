import { IBaseApiResponse } from "../../../../utils/base-api/api-provider";
import ApiService from "../../../../utils/base-api/api-service";
import { CategoryDto } from "./models/category-dto.models";
import { CustomerMenuParams } from "./models/customer-menu-params.models";
import { MealDto } from "./models/meal-dto.models";

class CustomerMenuServices extends ApiService {
  constructor() {
    super({
      baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/Customer/Menu`,
    });
  }

  public getRestaurantCategoryMeals(
    params: CustomerMenuParams
  ): Promise<IBaseApiResponse<MealDto[]>> {
    return this.get("/GetRestaurantCategoryMeals", { params: params });
  }

  public getRestaurantCategories(
    params: CustomerMenuParams
  ): Promise<IBaseApiResponse<CategoryDto[]>> {
    return this.get("/GetRestaurantCategories", { params: params });
  }
}

export const customerMenuServices = new CustomerMenuServices();
