import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../../core/core";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import { RestaurantHomeDto } from "../../../../customers/services/customer-restaurant/models/restaurantHomeDto";
import RestaurantRate from "./restaurant-rate.components";
import RestaurantReviewsList from "./restaurant-reviews-list.components";
import RestaurantTableRate from "./restaurant-table-rate.components";
import classes from "./style.module.css";

interface RestaurantReviewsAndRateProps {}

const RestaurantReviewsAndRate: FunctionComponent<
  RestaurantReviewsAndRateProps
> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { data } = useRestaurantDetails();

  return (
    <div id="reviewsAndRate">
      {data?.restaurantTypes ===
        RestaurantHomeDto.RestaurantTypesEnum.BLOGGER ||
      data?.restaurantTypes === RestaurantHomeDto.RestaurantTypesEnum.CHEF ||
      data?.restaurantTypes ===
        RestaurantHomeDto.RestaurantTypesEnum.INFLUENCER ? (
        <>
          <Text className={classes.title}>{t("reviewsAndRate")}</Text>
          <RestaurantRate />
          <RestaurantReviewsList />
        </>
      ) : (
        <>
          <Text className={classes.title}>{t("reviewsAndRate")}</Text>
          <RestaurantTableRate />
          <RestaurantRate />
          <RestaurantReviewsList />
        </>
      )}
    </div>
  );
};

export default RestaurantReviewsAndRate;
