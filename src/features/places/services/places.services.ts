import {
  IBaseApiResponse,
  PagedResultDto,
} from "../../../utils/base-api/api-provider";
import ApiService from "../../../utils/base-api/api-service";
import { PlacesGetAllParams } from "./models/places-get-all-params.models";
import { RestaurantSummaryDto } from "./models/restaurant-summary-dto.models";

class PlacesServices extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/Places` });
  }

  public getAll(
    params?: PlacesGetAllParams
  ): Promise<IBaseApiResponse<PagedResultDto<RestaurantSummaryDto>>> {
    return this.get("/GetAll", { params: params });
  }
}

export const placesServices = new PlacesServices();
