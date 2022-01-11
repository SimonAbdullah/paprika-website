import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../../core/core";
import RestaurantRate from "./restaurant-rate.components";
import RestaurantReviewsList from "./restaurant-reviews-list.components";
import RestaurantTableRate from "./restaurant-table-rate.components";
import classes from "./style.module.css";

interface RestaurantReviewsAndRateProps {}

const RestaurantReviewsAndRate: FunctionComponent<
  RestaurantReviewsAndRateProps
> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  return (
    <div id="reviewsAndRate">
      <Text className={classes.title}>{t("reviewsAndRate")}</Text>
      <RestaurantTableRate />
      <RestaurantRate />
      <RestaurantReviewsList />
    </div>
  );
};

export default RestaurantReviewsAndRate;
