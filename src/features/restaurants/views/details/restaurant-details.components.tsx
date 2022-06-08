import { Col, Divider, Row } from "antd";
import { FunctionComponent } from "react";
import { isDataEmpty } from "../../../../core/functions";
import { useRestaurantDetails } from "../../../customers/hooks/customer-restaurant.hooks";
import { RestaurantHomeDto } from "../../../customers/services/customer-restaurant/models/restaurantHomeDto";
import RestaurantGallery from "./gallery/restaurant-gallery.components";
import LocationComponent from "./location/location.components";
import RestaurantMenu from "./menu/restaurant-menu.components";
import RestaurantReviewsAndRate from "./reviews-and-rate/restaurant-reviews-and-rate.components";
import RestaurantSchedule from "./schedule/restaurant-schedule.components";
import RestaurantServices from "./services/restaurant-services.components";

interface RestaurantDetailsProps {}

const RestaurantDetails: FunctionComponent<RestaurantDetailsProps> = () => {
  const { data, galleryItems } = useRestaurantDetails();

  return (
    <Row justify="center" gutter={[0, 16]}>
      {data?.restaurantTypes ===
        RestaurantHomeDto.RestaurantTypesEnum.BLOGGER ||
      data?.restaurantTypes === RestaurantHomeDto.RestaurantTypesEnum.CHEF ||
      data?.restaurantTypes ===
        RestaurantHomeDto.RestaurantTypesEnum.INFLUENCER ? (
        <>
          <Col span={22}>
            <RestaurantGallery />
          </Col>
          <Divider />
          <Col span={22}>
            <RestaurantReviewsAndRate />
          </Col>
        </>
      ) : (
        <>
          <Col span={22}>
            <RestaurantServices />
          </Col>
          <Divider />
          {!data?.is24Hour && (
            <>
              <Col span={22}>
                <RestaurantSchedule />
              </Col>
              <Divider />
            </>
          )}
          <Col span={22}>
            <RestaurantMenu />
          </Col>
          <Divider />
          {isDataEmpty(galleryItems) && (
            <>
              <Col span={22}>
                <RestaurantGallery />
              </Col>
              <Divider />
            </>
          )}
          <Col span={22}>
            <LocationComponent />
          </Col>
          <Divider />
          <Col span={22}>
            <RestaurantReviewsAndRate />
          </Col>
        </>
      )}
    </Row>
  );
};

export default RestaurantDetails;
