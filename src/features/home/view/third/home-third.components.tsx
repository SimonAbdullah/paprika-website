import { Col, Row, Tag } from "antd";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import classes from "./style.module.css";
import Text from "antd/lib/typography/Text";

interface HomeThirdProps {}

const HomeThird: FunctionComponent<HomeThirdProps> = () => {
  const { t } = useTranslation("home");

  return (
    <Row className={classes.thirdContainer}>
      <Col xs={24} lg={12} className={classes.dishContainer} />
      <Col xs={24} lg={12} className={classes.contentContainer}>
        <Paragraph className={classes.paragraph}>
          {t("third.theMealYouLikeOnYourTime")}
        </Paragraph>
        <Title level={3} className={classes.title}>
          {t("third.moreThan")}
          <span className={classes.titleNumber}>{t("third.1000")}</span>
          {t("third.ofTheBestRestaurantAllOverDamascus")}
        </Title>
        <Paragraph className={classes.paragraph}>
          {t("third.allTheRestaurantAroundYou")}
        </Paragraph>
        <div className={classes.textContainer}>
          <Text className={classes.text}>
            {t("third.attractNewCustomersToYourRestaurant")}
          </Text>
        </div>
      </Col>
    </Row>
  );
};

export default HomeThird;
