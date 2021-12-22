import { FunctionComponent } from "react";
import { Button, Empty, List, Row } from "antd";
import { useInfinityRestaurantReviews } from "../../../../customers/hooks/customer-review.hooks";
import classes from "./style.module.css";
import useTranslation from "next-translate/useTranslation";
import { TranslationFiles } from "../../../../../core/core";
import RestaurantReviewDetails from "./restaurant-review-details.components";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import { isDataEmpty } from "../../../../../core/functions";

interface RestaurantReviewsListProps {}

const RestaurantReviewsList: FunctionComponent<RestaurantReviewsListProps> =
  () => {
    const { t } = useTranslation(TranslationFiles.RESTAURANT);

    const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
      useInfinityRestaurantReviews();

    const { hasReservation } = useRestaurantDetails();

    const dataSource = data?.pages?.flatMap((page) => page.items);

    if (isDataEmpty(dataSource)) {
      return (
        <>
          <br />
          <br />
        </>
      );
    }

    return (
      <List
        dataSource={dataSource}
        loading={isLoading}
        className={classes.list}
        grid={
          hasReservation
            ? { gutter: 24, column: 1, xxl: 3, xl: 2, lg: 1, md: 2 }
            : {
                gutter: 24,
                column: 1,
                xxl: 3,
                xl: 2,
                lg: 2,
                md: 2,
              }
        }
        loadMore={
          hasNextPage ? (
            <Row
              className={classes.loadMoreContainer}
              align="middle"
              justify="center"
            >
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
                {t("showMore")}
              </Button>
            </Row>
          ) : (
            <></>
          )
        }
        renderItem={(review, index) => (
          <List.Item key={index} className={classes.listItem}>
            <RestaurantReviewDetails review={review} />
          </List.Item>
        )}
      />
    );
  };

export default RestaurantReviewsList;
