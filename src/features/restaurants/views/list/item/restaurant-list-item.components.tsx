import { FunctionComponent } from "react";
import { Avatar, List, Rate } from "antd";
import Text from "antd/lib/typography/Text";
import classes from "./style.module.css";
import useTranslation from "next-translate/useTranslation";
import { PagesUrls, TranslationFiles } from "../../../../../core/core";
import { LocationBlackIcon } from "../../../../shared/icons/icons.components";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { SearchResultsRestaurants } from "../../../services/restaurants/models/search-results-restaurants.models";

interface RestaurantListItemProps {
  restaurant: SearchResultsRestaurants;
}

const RestaurantListItem: FunctionComponent<RestaurantListItemProps> = ({
  restaurant,
}) => {
  const { t } = useTranslation(TranslationFiles.COMMON);

  const { locale } = useRouter();

  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Link
            href={`${PagesUrls.RESTAURANTS}/${restaurant?._source.name}`}
            locale={locale}
          >
            <a>
              <Avatar
                className={classes.avatar}
                size="large"
                src={restaurant._source.logoimage}
                alt={restaurant?._source.name}
              />
            </a>
          </Link>
        }
        title={
          <Text
            className={classes.title}
            ellipsis={{ tooltip: restaurant?._source.name }}
          >
            {restaurant?._source.name}
          </Text>
        }
        description={
          <>
            <div className={classes.addressContainer}>
              <LocationBlackIcon />
              <Text
                ellipsis={{
                  tooltip: restaurant?._source.address,
                }}
              >
                {restaurant?._source.address}
              </Text>
            </div>
            <Text>
              <Rate
                className={classes.rating}
                value={restaurant?._source.restaurant_rate}
                allowHalf
                disabled
              />
              <Text className={classes.reviews}>
                {t("ratedBy")} {restaurant?._source.rated_by}
              </Text>
            </Text>
          </>
        }
      />
    </List.Item>
  );
};

export default RestaurantListItem;
