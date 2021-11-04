import { useInfiniteQuery, UseInfiniteQueryOptions } from "react-query";
import { PagedResultDto } from "../../../utils/base-api/api-provider";
import { CUSTOMER_INITIAL_REVIEW_API_PARAMS } from "../constants/customer-review.constants";
import { customerReviewServices } from "../services/customer-review/customer-review.services";
import { CustomerReviewParams } from "../services/customer-review/models/customer-review-params.models";
import { ReviewSummaryDto } from "../services/customer-review/models/review-summary-dto.models";
import { useRestaurantDetails } from "./customer-restaurant.hooks";

export const useInfinityRestaurantReviews = (
  params?: CustomerReviewParams,
  options?: UseInfiniteQueryOptions<
    PagedResultDto<ReviewSummaryDto>,
    unknown,
    PagedResultDto<ReviewSummaryDto>
  >
) => {
  const { data } = useRestaurantDetails();

  const result = useInfiniteQuery(
    ["infinityReviews", data?.id],
    async ({ pageParam }) => {
      const skip =
        !pageParam || pageParam === 1
          ? 0
          : (pageParam - 1) *
            CUSTOMER_INITIAL_REVIEW_API_PARAMS.MaxReviewsPerPage;

      const result = await customerReviewServices.getAll({
        SkipCount: skip,
        MaxResultCount: CUSTOMER_INITIAL_REVIEW_API_PARAMS.MaxReviewsPerPage,
        RestaurantId: data?.id,
        ...params,
      });

      return result.result;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.totalCount >
          allPages.length * CUSTOMER_INITIAL_REVIEW_API_PARAMS.MaxReviewsPerPage
          ? allPages.length + 1
          : undefined;
      },
      getPreviousPageParam: (_, allPages) => {
        return allPages.length > 1 ? allPages.length - 1 : undefined;
      },
      ...options,
    }
  );

  return result;
};
