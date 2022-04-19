import { Col, Row } from "antd";
import { FunctionComponent } from "react";
import { isDataEmpty } from "../../../../core/functions";
import { useUpcomingEvents } from "../../../customers/hooks/customer-event.hooks";
import { useFeaturedPlaces } from "../../../restaurants/hooks/places.hooks";
import HomeSecondRestaurantsHostEvents from "./home-second-restaurants-host-events.components";
import HomeSecondTopRestaurants from "./home-second-top-restaurants.components";
import classes from "./style.module.css";

interface HomeSecondProps {}

const HomeSecond: FunctionComponent<HomeSecondProps> = () => {
  const { data: featuredPlaces } = useFeaturedPlaces();

  const { data: upComingEvents } = useUpcomingEvents();

  if (
    isDataEmpty(featuredPlaces?.hits.hits) &&
    isDataEmpty(upComingEvents?.items)
  )
    return null;

  return (
    <Row justify="center">
      {!isDataEmpty(featuredPlaces?.hits.hits) && (
        <Col span={24} className={classes.firstColumn}>
          <div data-aos="flip-right" data-aos-duration="600">
            <HomeSecondTopRestaurants />
          </div>
        </Col>
      )}
      {!isDataEmpty(upComingEvents?.items) && (
        <Col span={24} className={classes.secondColumn}>
          <div data-aos="flip-left" data-aos-duration="600">
            <HomeSecondRestaurantsHostEvents />
          </div>
        </Col>
      )}
    </Row>
  );
};

export default HomeSecond;
