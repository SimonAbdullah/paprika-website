import { FunctionComponent, useRef } from "react";
import { Row, Col } from "antd";
import classes from "./style.module.css";
import Carousel from "react-multi-carousel";
import HomeFirstCarousel from "./home-first-carousel.components";
import HomeFirstBackground from "./home-first-background.components";
import HomeFirstSearchBox from "./home-first-search-box.components";
import { useState } from "react";

interface HomeFirstProps {}

const HomeFirst: FunctionComponent<HomeFirstProps> = () => {
  const carouselRef = useRef<Carousel>(null);

  const [pause, setPause] = useState(false);

  return (
    <Row className={classes.firstContainer} justify="center" align="middle">
      <HomeFirstBackground carouselRef={carouselRef} setPause={setPause} />
      <HomeFirstSearchBox />
      <Col span={24} dir="ltr">
        <HomeFirstCarousel carouselRef={carouselRef} pause={pause} />
      </Col>
    </Row>
  );
};

export default HomeFirst;
