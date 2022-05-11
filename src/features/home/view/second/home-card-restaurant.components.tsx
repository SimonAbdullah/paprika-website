import { Card, Col, Rate, Row } from "antd";
import { FunctionComponent } from "react";
import Image from "next/image";
import classes from "./style.module.css";
import useTranslation from "next-translate/useTranslation";
import { PagesUrls, TranslationFiles } from "../../../../core/core";
import Text from "antd/lib/typography/Text";
import { LocationIcon } from "../../../shared/icons/icons.components";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { SourceSearchResultsRestaurants } from "../../../restaurants/services/restaurants/models/search-results-restaurants.models";

interface HomeCardRestaurantProps {
  restaurant?: SourceSearchResultsRestaurants;
}

const HomeCardRestaurant: FunctionComponent<HomeCardRestaurantProps> = ({
  restaurant,
}) => {
  const { t } = useTranslation(TranslationFiles.HOME);

  const { sm } = useBreakpoint();

  const { locale } = useRouter();

  return (
    <Link href={`${PagesUrls.RESTAURANTS}/${restaurant?.name}`} locale={locale}>
      <a style={{ display: "block", position: "relative" }}>
        <Card
          hoverable
          className={classes.card}
          cover={
            <div className={classes.coverContainer}>
              <Image
                className={classes.image}
                src={restaurant?.logoimage || "/images/home/fallback-image.png"}
                alt={restaurant?.name}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                {...(restaurant?.logoimage
                  ? { blurDataURL: restaurant?.logoimage, placeholder: "blur" }
                  : {})}
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
                        value={restaurant?.restaurant_rate}
                        allowHalf
                        disabled
                      />
                      <Text className={classes.reviews}>
                        {t("second.ratedBy")} {restaurant?.rated_by}
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
                  {sm && (
                    <div className={classes.plateIcon}>
                      <Image
                        src={"/images/home/second-plate.svg"}
                        alt={t("second.alt.plateImage")}
                        width="36px"
                        height="36px"
                        objectFit="contain"
                        objectPosition="center"
                        priority={true}
                      />
                    </div>
                  )}
                </Row>
              </div>
            </div>
          }
          bodyStyle={{ display: "none" }}
        />
      </a>
    </Link>
  );
};

export default HomeCardRestaurant;
