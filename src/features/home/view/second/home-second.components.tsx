import { Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../core/core";
import HomeCardRestaurant from "./home-card-restaurant.components";
import HomeSecondHostMusicRestaurants from "./home-second-host-music-restaurants.components";
import HomeSecondTopRestaurants from "./home-second-top-restaurants.components";
import classes from "./style.module.css";

interface HomeSecondProps {}

const HomeSecond: FunctionComponent<HomeSecondProps> = () => {
  const { t } = useTranslation(TranslationFiles.HOME);
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
