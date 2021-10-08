import { Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent, useContext } from "react";
import classes from "./style.module.css";
import Text from "antd/lib/typography/Text";
import { TranslationFiles } from "../../../../core/core";
import Image from "next/image";
import { AppContext } from "../../../../core/app/app.context";

interface HomeThirdProps {}

const HomeThird: FunctionComponent<HomeThirdProps> = () => {
  const { t } = useTranslation(TranslationFiles.HOME);

  const { direction } = useContext(AppContext);

  return (
    <Row className={classes.thirdContainer} justify="center">
      <Image
        className={classes.backgroundImage}
        src="/images/home/third-background.png"
        alt={t("alt.backgroundImage")}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <Col xs={24} lg={12} className={classes.dishContainer}>
        <Image
          className={classes.dishImage}
          src={`/images/home/third-dish${
            direction === "rtl" ? "-reverse" : ""
          }.png`}
          alt={t("alt.dishImage")}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </Col>
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
            {t("attractNewCustomersToYourRestaurant")}
          </Text>
        </div>
      </Col>
    </Row>
  );
};

export default HomeThird;
