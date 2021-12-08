import { Card, Col, Rate, Row } from "antd";
import { FunctionComponent } from "react";
import Image from "next/image";
import classes from "./style.module.css";
import { RestaurantSummaryDto } from "../../../restaurants/services/places/models/restaurant-summary-dto.models";
import useTranslation from "next-translate/useTranslation";
import { PagesUrls, TranslationFiles } from "../../../../core/core";
import Text from "antd/lib/typography/Text";
import { LocationIcon } from "../../../shared/icons/icons.components";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { CustomerEventDto } from "../../../customers/services/customer-event/models/customer-event-dto.models";
import { IsOfTypeT } from "../../../../core/functions";

interface HomeCardRestaurantProps {
  restaurant?: RestaurantSummaryDto | CustomerEventDto;
}

const HomeCardRestaurant: FunctionComponent<HomeCardRestaurantProps> = ({
  restaurant,
}) => {
  const { t } = useTranslation(TranslationFiles.HOME);

  const { push, locale } = useRouter();

  return IsOfTypeT<
    RestaurantSummaryDto | CustomerEventDto,
    RestaurantSummaryDto
  >(restaurant) ? (
    <Link href={`${PagesUrls.RESTAURANTS}/${restaurant?.name}`} locale={locale}>
      <a>
        <Card
          onClick={() => {
            push(`${PagesUrls.RESTAURANTS}/${restaurant?.name}`);
          }}
          hoverable
          className={classes.card}
          cover={
            <div className={classes.coverContainer}>
              <Image
                className={classes.image}
                src={
                  restaurant?.logoImage || "/images/home/first-background.png"
                }
                alt={restaurant?.name}
                blurDataURL={restaurant?.logoImage}
                placeholder="blur"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
              <div className={classes.content}>
                <Row>
                  <Col span={24}>
                    <Text
                      ellipsis={{ tooltip: restaurant?.name }}
                      className={classes.cardTitle}
                    >
                      {restaurant?.name}
                    </Text>
                    <div className={classes.rateAndReview}>
                      <Rate
                        className={classes.rating}
                        value={restaurant?.restaurantRate}
                        allowHalf
                        disabled
                      />
                      <Text className={classes.reviews}>
                        {restaurant?.totalRestaurantRatersCount}{" "}
                        {t("second.reviews")}
                      </Text>
                    </div>
                    <Text className={classes.address}>
                      <LocationIcon />
                      <Text
                        className={classes.address}
                        ellipsis={{ tooltip: restaurant?.address }}
                      >
                        {restaurant?.address}
                      </Text>
                    </Text>
                  </Col>
                  <div className={classes.plateIcon}>
                    <Image
                      src={"/images/home/second-plate.svg"}
                      alt={t("second.alt.plateImage")}
                      width="46px"
                      height="46px"
                      objectFit="contain"
                      objectPosition="center"
                    />
                  </div>
                </Row>
              </div>
            </div>
          }
        />
      </a>
    </Link>
  ) : (
    <Link
      href={`${PagesUrls.RESTAURANTS}/${restaurant?.restaurantName}`}
      locale={locale}
    >
      <a>
        <Card
          onClick={() => {
            push(`${PagesUrls.RESTAURANTS}/${restaurant?.restaurantName}`);
          }}
          hoverable
          className={classes.card}
          cover={
            <div className={classes.coverContainer}>
              <Image
                className={classes.image}
                src={
                  restaurant?.restaurantImage ||
                  "/images/home/first-background.png"
                }
                alt={restaurant?.name}
                blurDataURL={restaurant?.restaurantImage}
                placeholder="blur"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
              <div className={classes.content}>
                <Row>
                  <Col span={24}>
                    <Text
                      ellipsis={{ tooltip: restaurant?.name }}
                      className={classes.cardTitle}
                    >
                      {restaurant?.restaurantName}
                    </Text>
                    <div className={classes.rateAndReview}>
                      <Rate
                        className={classes.rating}
                        value={restaurant?.restaurantRate}
                        allowHalf
                        disabled
                      />
                      <Text className={classes.reviews}>
                        {restaurant?.totalRestaurantRatersCount}{" "}
                        {t("second.reviews")}
                      </Text>
                    </div>
                    <Text
                      className={classes.address}
                      ellipsis={{ tooltip: restaurant?.restaurantAddress }}
                    >
                      <LocationIcon />
                      {restaurant?.restaurantAddress}
                    </Text>
                  </Col>
                  <div className={classes.plateIcon}>
                    <Image
                      src={"/images/home/second-plate.svg"}
                      alt={t("second.alt.plateImage")}
                      width="46px"
                      height="46px"
                      objectFit="contain"
                      objectPosition="center"
                    />
                  </div>
                </Row>
              </div>
            </div>
          }
        />
      </a>
    </Link>
  );
};

export default HomeCardRestaurant;
