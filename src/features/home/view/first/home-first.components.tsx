import { FunctionComponent, useRef } from "react";
import { Row, Col } from "antd";
import classes from "./style.module.css";
import Carousel from "react-multi-carousel";
import HomeFirstCarousel from "./home-first-carousel.components";
import HomeFirstBackground from "./home-first-background.components";

interface HomeFirstProps {}

const HomeFirst: FunctionComponent<HomeFirstProps> = () => {
  const carouselRef = useRef<Carousel>(null);

  return (
    <Row className={classes.firstContainer} justify="center" align="middle">
      <HomeFirstBackground carouselRef={carouselRef} />
      <Col span={24} dir="ltr">
        <HomeFirstCarousel carouselRef={carouselRef} />
      </Col>
    </Row>
  );
};

export default HomeFirst;
