import { Progress, Rate } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../../core/core";
import { percentOfNumber } from "../../../../../core/functions";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import classes from "./style.module.css";

interface RestaurantRateProps {}

const RestaurantRate: FunctionComponent<RestaurantRateProps> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { data } = useRestaurantDetails();

  return (
    <div className={classes.rateContainer}>
      <Text className={classes.rateText}>{4}</Text>
      <Rate
        className={classes.rateStars}
        allowHalf
        disabled
        value={data?.restaurantRate}
      />
      <Text className={classes.rateRow}>
        <Text className={classes.progressRateText}>{`${t("5")} ${t(
          "star"
        )} `}</Text>
        <Progress
          className={classes.progress}
          type="line"
          showInfo={false}
          percent={percentOfNumber(data?.restaurantRaters?.fiveStars || 0)}
        />
      </Text>
      <Text className={classes.rateRow}>
        <Text className={classes.progressRateText}>{`${t("4")} ${t(
          "star"
        )} `}</Text>
        <Progress
          className={classes.progress}
          type="line"
          showInfo={false}
          percent={percentOfNumber(data?.restaurantRaters?.fourStars || 0)}
        />
      </Text>
      <Text className={classes.rateRow}>
        <Text className={classes.progressRateText}>{`${t("3")} ${t(
          "star"
        )} `}</Text>
        <Progress
          className={classes.progress}
          type="line"
          showInfo={false}
          percent={percentOfNumber(data?.restaurantRaters?.threeStars || 0)}
        />
      </Text>
      <Text className={classes.rateRow}>
        <Text className={classes.progressRateText}>{`${t("2")} ${t(
          "star"
        )} `}</Text>
        <Progress
          className={classes.progress}
          type="line"
          showInfo={false}
          percent={percentOfNumber(data?.restaurantRaters?.twoStars || 0)}
        />
      </Text>
      <Text className={classes.rateRow}>
        <Text className={classes.progressRateText}>{`${t("1")} ${t(
          "star"
        )} `}</Text>
        <Progress
          className={classes.progress}
          type="line"
          showInfo={false}
          percent={percentOfNumber(data?.restaurantRaters?.oneStar || 0)}
        />
      </Text>
    </div>
  );
};

export default RestaurantRate;
