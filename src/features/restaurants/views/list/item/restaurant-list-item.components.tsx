import { FunctionComponent } from "react";
import { Avatar, List, Rate } from "antd";
import { RestaurantSummaryDto } from "../../../services/places/models/restaurant-summary-dto.models";
import Text from "antd/lib/typography/Text";
import classes from "./style.module.css";
import useTranslation from "next-translate/useTranslation";
import { PagesUrls, TranslationFiles } from "../../../../../core/core";
import { LocationBlackIcon } from "../../../../shared/icons/icons.components";
import Link from "next/link";

interface RestaurantListItemProps {
  restaurant: RestaurantSummaryDto;
}

const RestaurantListItem: FunctionComponent<RestaurantListItemProps> = ({
  restaurant,
}) => {
  const { t } = useTranslation(TranslationFiles.COMMON);
  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Link href={`${PagesUrls.RESTAURANTS}/${restaurant?.name}`}>
            <a>
              <Avatar
                className={classes.avatar}
                size="large"
                src={restaurant.logoImage}
                alt={restaurant.name}
              />
            </a>
          </Link>
        }
        title={
          <Text
            className={classes.title}
            ellipsis={{ tooltip: restaurant.name }}
          >
            {restaurant.name}
          </Text>
        }
        description={
          <>
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
            </Text>{" "}
          </>
        }
      />
    </List.Item>
  );
};

export default RestaurantListItem;
