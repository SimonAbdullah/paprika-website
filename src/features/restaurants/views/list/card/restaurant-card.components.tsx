import { Card, Col, Rate, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import { FunctionComponent } from "react";
import { LocationBlackIcon } from "../../../../shared/icons/icons.components";
import Image from "next/image";
import { RestaurantSummaryDto } from "../../../services/places/models/restaurant-summary-dto.models";
import classes from "./style.module.css";
import useTranslation from "next-translate/useTranslation";
import { PagesUrls, TranslationFiles } from "../../../../../core/core";
import Link from "next/link";

interface RestaurantCardProps {
  restaurant: RestaurantSummaryDto;
}

const RestaurantCard: FunctionComponent<RestaurantCardProps> = ({
  restaurant,
}) => {
  const { t } = useTranslation(TranslationFiles.COMMON);

  return (
    <Link href={`${PagesUrls.RESTAURANTS}/${restaurant?.id}`}>
      <a>
        <Card
          hoverable
          size="small"
          cover={
            <Image
              src={restaurant?.logoImage || "/images/home/first-background.png"}
              alt={restaurant?.name}
              layout="responsive"
              width="100%"
              height="60%"
              objectFit="cover"
            />
          }
        >
          <Row>
            <Col span={24}>
              <Space
                direction="vertical"
                size="small"
                className={classes.space}
              >
                <Text
                  className={classes.cardTitle}
                  ellipsis={{ tooltip: restaurant.name }}
                >
                  {restaurant?.name}
                </Text>
                <div className={classes.addressContainer}>
                  <LocationBlackIcon />
                  <Text
                    ellipsis={{
                      tooltip: restaurant?.address,
                    }}
                  >
                    {restaurant?.address}
                  </Text>
                </div>
                <Text>
                  <Rate
                    className={classes.rating}
                    value={restaurant?.restaurantRate}
                    allowHalf
                    disabled
                  />
                  <Text className={classes.reviews}>{`${
                    restaurant?.restaurantRate
                  } ${t("reviews")}`}</Text>
                </Text>
              </Space>
            </Col>
          </Row>
        </Card>
      </a>
    </Link>
  );
};

export default RestaurantCard;
