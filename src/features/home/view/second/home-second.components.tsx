import { Col, Row } from "antd";
import { FunctionComponent } from "react";
import HomeSecondHostMusicRestaurants from "./home-second-host-music-restaurants.components";
import HomeSecondTopRestaurants from "./home-second-top-restaurants.components";
import classes from "./style.module.css";

interface HomeSecondProps {}

const HomeSecond: FunctionComponent<HomeSecondProps> = () => {
  return (
    <Row justify="center">
      <Col span={24} className={classes.firstColumn}>
        <HomeSecondTopRestaurants />
      </Col>
      <Col span={24} className={classes.secondColumn}>
        <HomeSecondHostMusicRestaurants />
      </Col>
    </Row>
  );
};

export default HomeSecond;
