import { Rate, Row } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../../core/core";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import classes from "./style.module.css";

interface RestaurantMainInfoProps {}

const RestaurantMainInfo: FunctionComponent<RestaurantMainInfoProps> = () => {
  const { data } = useRestaurantDetails();

  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  return (
    <Row justify="space-between">
      <Title className={classes.title}>{data?.name}</Title>
      {data?.restaurantRate && (
        <div>
          <Title level={5} className={classes.ourRate}>
            {t("ourRate")}
          </Title>
          <Text className={classes.rateText}>{data.restaurantRate}</Text>
          <Rate
            className={classes.rateStars}
            allowHalf
            disabled
            value={data.restaurantRate}
          />
          <Text className={classes.reviews} type="danger">
            {t("reviews")}
          </Text>
        </div>
      )}
    </Row>
  );
};

export default RestaurantMainInfo;
