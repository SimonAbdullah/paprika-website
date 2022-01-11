import { Rate, Row } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { PagesUrls, TranslationFiles } from "../../../../../core/core";
import { getSumOfObjectValues } from "../../../../../core/functions";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import Link from "next/link";
import classes from "./style.module.css";

interface RestaurantMainInfoProps {}

const RestaurantMainInfo: FunctionComponent<RestaurantMainInfoProps> = () => {
  const { data } = useRestaurantDetails();

  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  return (
    <Row justify="space-between">
      <Title className={classes.title}>{data?.name}</Title>
      {data?.restaurantRate !== undefined && data?.restaurantRate !== null && (
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
          <Link href={`${PagesUrls.RESTAURANTS}/${data.name}#reviewsAndRate`}>
            <a className={classes.reviews}>
              <Text>
                {t("ratedBy")}{" "}
                {getSumOfObjectValues(data.restaurantRaters || {})}
              </Text>
            </a>
          </Link>
        </div>
      )}
    </Row>
  );
};

export default RestaurantMainInfo;
