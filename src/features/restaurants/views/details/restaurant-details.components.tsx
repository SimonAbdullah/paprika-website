import { Col, Row } from "antd";
import { FunctionComponent } from "react";
import AboutRestaurantCenter from "./about-restaurant-center/about-restaurant-center.components";
import RestaurantServices from "./services/restaurant-services.components";

interface RestaurantDetailsProps {}

const RestaurantDetails: FunctionComponent<RestaurantDetailsProps> = () => {
  return (
    <Row justify="center" gutter={[0, 16]}>
      <Col span={22}>
        <AboutRestaurantCenter />
      </Col>
      <Col span={22}>
        <RestaurantServices />
      </Col>
      <Col span={22}></Col>
      <Col span={22}></Col>
      <Col span={22}></Col>
      <Col span={22}></Col>
      <Col span={22}></Col>
      <Col span={22}></Col>
      <Col span={22}></Col>
    </Row>
  );
};

export default RestaurantDetails;
