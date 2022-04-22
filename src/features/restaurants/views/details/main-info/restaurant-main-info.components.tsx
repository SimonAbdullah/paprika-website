import { Avatar, Col, Row } from "antd";
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
import { HeartOutlined } from "@ant-design/icons";

interface RestaurantMainInfoProps {}

const RestaurantMainInfo: FunctionComponent<RestaurantMainInfoProps> = () => {
  const { data } = useRestaurantDetails();

  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  return (
    <>
      <Row align="top" style={{ position: "relative" }}>
        <Title className={classes.title}>
          <Avatar
            className={classes.avatar}
            size="large"
            src={data?.logoImage}
            alt={data?.name}
          />
          {data?.name}
        </Title>
      </Row>
      <Row justify="center">
        <Col xs={12}>
          <div className={classes.followersContainer}>
            <Title level={5} className={classes.followers}>
              {t("followers")}
            </Title>
            <Row align="middle">
              <Text className={classes.followersText}>
                {data?.statistics?.followedBy !== undefined &&
                data?.statistics.followedBy !== null
                  ? data?.statistics?.followedBy
                  : 0}
              </Text>
              <HeartOutlined
                style={{
                  display: "inline-block",
                  fontSize: "1.5rem",
                  color: "#CE4C42",
                }}
              />
            </Row>
          </div>
        </Col>

        <Col>
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
                <Link
                  href={`${PagesUrls.RESTAURANTS}/${data.name}#reviewsAndRate`}
                >
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
        </Col>
      </Row>
    </>
  );
};

export default RestaurantMainInfo;
