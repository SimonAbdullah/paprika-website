import { FunctionComponent } from "react";
import { Button, List, Row } from "antd";
import PagesNumber from "../../../shared/pages-number/pages-number.components";
import ItemsCount from "../../../shared/items-count/items-count.components";
import { useInfinityPlaces } from "../../hooks/places.hooks";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { TranslationFiles } from "../../../../core/core";
import useTranslation from "next-translate/useTranslation";
import classes from "./style.module.css";
import { RESTAURANTS_INITIAL_PLACES_API_PARAMS } from "../../constants/restaurants.constants";
import { DownOutlined } from "@ant-design/icons";
import RestaurantListItem from "./item/restaurant-list-item.components";

interface RestaurantListViewProps {}

const RestaurantListView: FunctionComponent<RestaurantListViewProps> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANTS);

  const { sm } = useBreakpoint();

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfinityPlaces();

  const dataSource = data?.pages?.flatMap((page) => page.items);
  return (
    <List
      dataSource={dataSource}
      loadMore={
        <Row
          className={classes.loadMoreContainer}
          align="middle"
          justify="space-between"
        >
          <PagesNumber
            itemsTotalCount={data?.pages?.[0].totalCount || 0}
            itemsPerPage={
              RESTAURANTS_INITIAL_PLACES_API_PARAMS.MaxRestaurantsPerPage
            }
            currentItemsCount={dataSource?.length}
          />
          <Button
            size="large"
            type="primary"
            disabled={!hasNextPage}
            loading={isFetching}
            onClick={() => {
              fetchNextPage();
            }}
            className={classes.showMoreButton}
          >
            {t("showMore")} <DownOutlined style={{ fontSize: "0.6rem" }} />
          </Button>
          {sm && (
            <ItemsCount
              count={data?.pages?.[0].totalCount}
              text={t("restaurants")}
            />
          )}
        </Row>
      }
      grid={{
        gutter: 48,
        column: 1,
        xxl: 2,
        xl: 2,
        lg: 2,
        md: 2,
        sm: 2,
        xs: 1,
      }}
      renderItem={(restaurant) => (
        <RestaurantListItem key={restaurant.id} restaurant={restaurant} />
      )}
    />
  );
};

export default RestaurantListView;
