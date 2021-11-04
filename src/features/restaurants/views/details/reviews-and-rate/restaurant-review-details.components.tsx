import { Avatar, Comment, Rate, Space } from "antd";
import Text from "antd/lib/typography/Text";
import { FunctionComponent } from "react";
import { ReviewSummaryDto } from "../../../../customers/services/customer-review/models/review-summary-dto.models";
import classes from "./style.module.css";

interface RestaurantReviewDetailsProps {
  review: ReviewSummaryDto;
}

const RestaurantReviewDetails: FunctionComponent<RestaurantReviewDetailsProps> =
  ({ review }) => {
    return (
      <Comment
        author={
          <Space>
            <Avatar
              src={review.customerProfileImage}
              alt={review.customerFullName}
              shape="square"
              size="large"
              className={classes.reviewAvatar}
            />
            <Space direction="vertical">
              <Text className={classes.reviewAuthor}>
                {review.customerFullName}
              </Text>
              <Rate
                value={review.rate}
                disabled
                allowHalf
                className={classes.reviewRateStars}
              />
            </Space>
          </Space>
        }
        content={
          <Text className={classes.reviewContent}>{review.comment}</Text>
        }
        className={classes.review}
      />
    );
  };

export default RestaurantReviewDetails;
