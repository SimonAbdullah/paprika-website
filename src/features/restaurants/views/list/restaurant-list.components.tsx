import { DownOutlined } from "@ant-design/icons";
import { Button, List, Row } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../core/core";
import ItemsCount from "../../../shared/items-count/items-count.components";
import PagesNumber from "../../../shared/pages-number/pages-number.components";
import { RESTAURANTS_INITIAL_Places_API_PARAMS } from "../../constants/restaurants.constants";
import { useInfinityPlaces } from "../../hooks/places.hooks";
import RestaurantCard from "./card/restaurant-card.components";
import classes from "./style.module.css";

interface RestaurantListProps {}

const RestaurantList: FunctionComponent<RestaurantListProps> = () => {
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
              RESTAURANTS_INITIAL_Places_API_PARAMS.MaxRestaurantsPerPage
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
        gutter: 16,
        column: 1,
        xxl: 5,
        xl: 3,
        lg: 2,
        md: 2,
        sm: 2,
        xs: 1,
      }}
      renderItem={(restaurant) => (
        <List.Item key={restaurant.id}>
          <RestaurantCard restaurant={restaurant} />
        </List.Item>
      )}
    />
  );
};

export default RestaurantList;
