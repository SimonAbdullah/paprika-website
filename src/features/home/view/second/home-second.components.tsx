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
        <div data-aos="flip-right" data-aos-duration="600">
          <HomeSecondTopRestaurants />
        </div>
      </Col>
      <Col span={24} className={classes.secondColumn}>
        <div data-aos="flip-left" data-aos-duration="600">
          <HomeSecondHostMusicRestaurants />
        </div>
      </Col>
    </Row>
  );
};

export default HomeSecond;
