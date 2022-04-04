import { IBaseApiResponse } from "../../../../utils/base-api/api-provider";
import ApiService from "../../../../utils/base-api/api-service";
import { MealLinksDto } from "./models/meal-links-dto";
import { MealLinksParams } from "./models/meal-links-params.models";

class MealLinksServices extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/Links` });
  }
  public getForMeal(
    params: MealLinksParams
  ): Promise<IBaseApiResponse<MealLinksDto>> {
    return this.get("/GetForMeal", { params: params });
  }
}
export const mealLinksServices = new MealLinksServices();
