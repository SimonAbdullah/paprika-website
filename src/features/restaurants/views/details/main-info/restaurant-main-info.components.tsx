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
import { EyeOutlined, HeartOutlined } from "@ant-design/icons";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

interface RestaurantMainInfoProps {}

const RestaurantMainInfo: FunctionComponent<RestaurantMainInfoProps> = () => {
  const { data } = useRestaurantDetails();

  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { xs } = useBreakpoint();

  const numberFormat = (num: any) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };

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
        <Col sm={7} xs={12}>
          <div className={classes.viewsContainer}>
            <Title level={5} className={classes.views}>
              {t("Views")}
            </Title>
            <Text className={classes.viewsText}>
              {data?.statistics?.restaurantViews !== undefined &&
              data?.statistics.restaurantViews !== null
                ? numberFormat(data?.statistics?.restaurantViews)
                : 0}
            </Text>
            <EyeOutlined className={classes.viewsIcon} />
          </div>
        </Col>

        <Col sm={7} xs={12}>
          <div className={classes.followersContainer}>
            <Title level={5} className={classes.followers}>
              {t("followers")}
            </Title>
            <Text className={classes.followersText}>
              {data?.statistics?.followedBy !== undefined &&
              data?.statistics?.followedBy !== null
                ? numberFormat(data?.statistics?.followedBy)
                : 0}
            </Text>
            <HeartOutlined className={classes.followersIcon} />
          </div>
        </Col>

        <Col sm={7} xs={24}>
          {data?.restaurantRate !== undefined && data?.restaurantRate !== null && (
            <div className={classes.rateContainer}>
              <Title level={5} className={classes.ourRate}>
                {t("ourRate")}
              </Title>
              <Text className={classes.rateText}>{data.restaurantRate}</Text>
              <StarRate
                display="inline-block"
                size={xs ? "1.2rem" : "1.5rem"}
                color="#f4b223"
                rate={data.restaurantRate / 5}
              />
              <Link
                href={`${PagesUrls.RESTAURANTS}/${data.name}#reviews-and-rate`}
              >
                <a className={classes.reviews}>
                  <Text>
                    {t("ratedBy")}{" "}
                    {getSumOfObjectValues(data.restaurantRaters || {})}
                  </Text>
                </a>
              </Link>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default RestaurantMainInfo;
