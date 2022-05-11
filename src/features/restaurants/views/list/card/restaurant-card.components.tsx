import { Card, Col, Rate, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import { FunctionComponent } from "react";
import { LocationBlackIcon } from "../../../../shared/icons/icons.components";
import Image from "next/image";
import classes from "./style.module.css";
import useTranslation from "next-translate/useTranslation";
import { PagesUrls, TranslationFiles } from "../../../../../core/core";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { SourceSearchResultsRestaurants } from "../../../services/restaurants/models/search-results-restaurants.models";

interface RestaurantCardProps {
  restaurant: SourceSearchResultsRestaurants;
}

const RestaurantCard: FunctionComponent<RestaurantCardProps> = ({
  restaurant,
}) => {
  const { t } = useTranslation(TranslationFiles.COMMON);

  const { locale } = useRouter();

  return (
    <Link href={`${PagesUrls.RESTAURANTS}/${restaurant?.name}`} locale={locale}>
      <a style={{ display: "block", position: "relative" }}>
        <Card
          hoverable
          size="small"
          cover={
            <Image
              src={restaurant?.logoimage || "/images/home/fallback-image.png"}
              alt={restaurant?.name}
              layout="responsive"
              width="100%"
              height="60%"
              objectFit="cover"
              priority={true}
              {...(restaurant?.logoimage
                ? { blurDataURL: restaurant?.logoimage, placeholder: "blur" }
                : {})}
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
                  ellipsis={{ tooltip: restaurant?.name }}
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
                    value={restaurant?.restaurant_rate}
                    allowHalf
                    disabled
                  />
                  <Text className={classes.reviews}>
                    {t("ratedBy")} {restaurant?.rated_by}
                  </Text>
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
