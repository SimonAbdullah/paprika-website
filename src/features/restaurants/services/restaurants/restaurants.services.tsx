import ApiService from "../../../../utils/base-api/api-service";
import { BaseApiSearchResponse } from "./models/base-api-search-response.models";
import { RestaurantsGetAllParams } from "./models/restaurants-get-all-params.models";

class RestaurantsServices extends ApiService {
  constructor() {
    super({
      baseURL: `${process.env.NEXT_PUBLIC_BASE_ELASTIC_SEARCH}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_ELASTICSEARCH_USERNAME}:${process.env.NEXT_PUBLIC_ELASTICSEARCH_PASSWORD}`
        ).toString("base64")}`,
      },
    });
  }

  public getAll(
    params?: RestaurantsGetAllParams
  ): Promise<BaseApiSearchResponse> {
    return this.post("/_search", params);
  }
}

export const restaurantsServices = new RestaurantsServices();
