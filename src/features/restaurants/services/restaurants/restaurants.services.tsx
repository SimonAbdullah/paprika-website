import {
  AuthorizationElasticSearchProduction,
  AuthorizationElasticSearchTesting,
} from "../../../../core/constants";
import ApiService from "../../../../utils/base-api/api-service";
import { BaseApiSearchResponse } from "./models/base-api-search-response.models";
import { RestaurantsGetAllParams } from "./models/restaurants-get-all-params.models";

class RestaurantsServices extends ApiService {
  constructor() {
    super({
      baseURL: `${process.env.NEXT_PUBLIC_BASE_Elastic_Search}`,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          process.env.NODE_ENV === "production"
            ? `Basic  ${Buffer.from(
                AuthorizationElasticSearchProduction.userName +
                  ":" +
                  AuthorizationElasticSearchProduction.password
              ).toString("base64")}`
            : `Basic ${Buffer.from(
                AuthorizationElasticSearchTesting.userName +
                  ":" +
                  AuthorizationElasticSearchTesting.password
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
