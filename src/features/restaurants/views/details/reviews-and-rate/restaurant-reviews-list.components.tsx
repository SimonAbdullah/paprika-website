import { FunctionComponent } from "react";
import { Button, List, Row } from "antd";
import { useInfinityRestaurantReviews } from "../../../../customers/hooks/customer-review.hooks";
import classes from "./style.module.css";
import useTranslation from "next-translate/useTranslation";
import { TranslationFiles } from "../../../../../core/core";
import RestaurantReviewDetails from "./restaurant-review-details.components";

interface RestaurantReviewsListProps {}

const RestaurantReviewsList: FunctionComponent<RestaurantReviewsListProps> =
  () => {
    const { t } = useTranslation(TranslationFiles.RESTAURANT);

    const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
      useInfinityRestaurantReviews();

    const dataSource = data?.pages?.flatMap((page) => page.items);

    return (
      <List
        dataSource={dataSource}
        loading={isLoading}
        className={classes.list}
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
          <List.Item key={index}>
            <RestaurantReviewDetails review={review} />
          </List.Item>
        )}
      />
    );
  };

export default RestaurantReviewsList;
