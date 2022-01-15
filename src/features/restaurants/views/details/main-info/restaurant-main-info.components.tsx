import { Row } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { PagesUrls, TranslationFiles } from "../../../../../core/core";
import { getSumOfObjectValues } from "../../../../../core/functions";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import Link from "next/link";
import classes from "./style.module.css";
import StarRate from "../../../../shared/star-rate/star-rate.components";

interface RestaurantMainInfoProps {}

const RestaurantMainInfo: FunctionComponent<RestaurantMainInfoProps> = () => {
  const { data } = useRestaurantDetails();

  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  return (
    <Row justify="space-between" align="top" style={{ position: "relative" }}>
      <Title className={classes.title}>{data?.name}</Title>
      {data?.restaurantRate !== undefined && data?.restaurantRate !== null && (
        <div className={classes.rateContainer}>
          <Title level={5} className={classes.ourRate}>
            {t("ourRate")}
          </Title>
          <Row align="middle">
            <Text className={classes.rateText}>{data.restaurantRate}</Text>
            <StarRate
              display="inline-block"
              size="1.5rem"
              color="#f4b223"
              rate={data.restaurantRate / 5}
            />
            <Link href={`${PagesUrls.RESTAURANTS}/${data.name}#reviewsAndRate`}>
              <a className={classes.reviews}>
                <Text>
                  {t("ratedBy")}{" "}
                  {getSumOfObjectValues(data.restaurantRaters || {})}
                </Text>
              </a>
            </Link>
          </Row>
        </div>
      )}
    </Row>
  );
};

export default RestaurantMainInfo;
