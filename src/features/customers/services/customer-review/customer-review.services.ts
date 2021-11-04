import {
  IBaseApiResponse,
  PagedResultDto,
} from "../../../../utils/base-api/api-provider";
import ApiService from "../../../../utils/base-api/api-service";
import { CustomerReviewParams } from "./models/customer-review-params.models";
import { ReviewSummaryDto } from "./models/review-summary-dto.models";

class CustomerReviewServices extends ApiService {
  constructor() {
    super({
      baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/Customer/Review`,
    });
  }

  public getAll(
    params: CustomerReviewParams
  ): Promise<IBaseApiResponse<PagedResultDto<ReviewSummaryDto>>> {
    return this.get("/GetAllRestaurantReviews", { params: params });
  }
}

export const customerReviewServices = new CustomerReviewServices();
