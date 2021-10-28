import { IBaseApiResponse } from "../../../../utils/base-api/api-provider";
import ApiService from "../../../../utils/base-api/api-service";
import { CustomerRestaurantParams } from "./models/customer-restaurant-params.models";
import { RestaurantHomeDto } from "./models/restaurantHomeDto";

class CustomerRestaurantServices extends ApiService {
  constructor() {
    super({
      baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/Customer/Restaurant`,
    });
  }

  public getDetails(
    params: CustomerRestaurantParams
  ): Promise<IBaseApiResponse<RestaurantHomeDto>> {
    return this.get("/Get", { params: params });
  }
}

export const customerRestaurantServices = new CustomerRestaurantServices();
