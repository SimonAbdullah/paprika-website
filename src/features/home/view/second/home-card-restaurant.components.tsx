import { Card, Col, Rate, Row, Space } from "antd";
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

interface HomeCardRestaurantProps {
  restaurant?: RestaurantSummaryDto;
}

const HomeCardRestaurant: FunctionComponent<HomeCardRestaurantProps> = ({
  restaurant,
}) => {
  const { t } = useTranslation(TranslationFiles.HOME);

  const { push } = useRouter();

  return (
    <Link href={`${PagesUrls.RESTAURANTS}/${restaurant?.id}`}>
      <a>
        <Card
          onClick={() => {
            push(`${PagesUrls.RESTAURANTS}/${restaurant?.id}`);
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
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
              <div className={classes.content}>
                <Row>
                  <Col span={24}>
                    <Space direction="vertical" size="small">
                      <Text className={classes.cardTitle}>
                        {restaurant?.name}
                      </Text>
                      <div>
                        <Rate
                          className={classes.rating}
                          value={restaurant?.restaurantRate}
                          allowHalf
                          disabled
                        />
                        <Text className={classes.reviews}>{`${
                          restaurant?.restaurantRate
                        } ${t("second.reviews")}`}</Text>
                      </div>
                      <Text className={classes.address}>
                        <LocationIcon />
                        {restaurant?.address}
                      </Text>
                    </Space>
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
