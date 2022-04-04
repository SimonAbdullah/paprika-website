import { IBaseApiResponse } from "../../../../utils/base-api/api-provider";
import ApiService from "../../../../utils/base-api/api-service";
import { LinksRestaurantParams } from "./models/links-restaurant-params.models";
import { RestaurantDto } from "./models/restaurant-dto";

class LinksServices extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/Links` });
  }
  public getForRestaurant(
    params: LinksRestaurantParams
  ): Promise<IBaseApiResponse<RestaurantDto>> {
    return this.get("/GetForRestaurant", { params: params });
  }
}
export const linksServices = new LinksServices();
