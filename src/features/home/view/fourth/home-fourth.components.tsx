import { Col, Row } from "antd";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../core/core";
import classes from "./style.module.css";
import Image from "next/image";
import Paragraph from "antd/lib/typography/Paragraph";
import Text from "antd/lib/typography/Text";

interface HomeFourthProps {}

const HomeFourth: FunctionComponent<HomeFourthProps> = () => {
  const { t } = useTranslation(TranslationFiles.HOME);

  return (
    <Row className={classes.fourthContainer} justify="center" align="middle">
      <Col md={8} className={classes.column}>
        <Image
          src="/images/home/fourth-dining-table.svg"
          alt={t("fourth.alt.diningTableImage")}
          width="80px"
          height="80px"
          objectPosition="center"
        />
        <Paragraph className={`${classes.paragraph} ${classes.number}`}>
          200
        </Paragraph>
        <Paragraph className={`${classes.paragraph} ${classes.title}`}>
          {t("fourth.restaurants")}
        </Paragraph>
        <Text className={classes.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non a, netus
          urna enim tristique.
        </Text>
      </Col>
      <Col md={8} className={classes.column}>
        <Image
          src="/images/home/fourth-reserved.svg"
          alt={t("fourth.alt.diningTableImage")}
          width="80px"
          height="80px"
          objectPosition="center"
        />
        <Paragraph className={`${classes.paragraph} ${classes.number}`}>
          200
        </Paragraph>
        <Paragraph className={`${classes.paragraph} ${classes.title}`}>
          {t("fourth.reservation")}
        </Paragraph>
        <Text className={classes.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non a, netus
          urna enim tristique.
        </Text>
      </Col>
      <Col md={8} className={classes.column}>
        <Image
          src="/images/home/fourth-app.svg"
          alt={t("fourth.alt.diningTableImage")}
          width="80px"
          height="80px"
          objectPosition="center"
        />
        <Paragraph className={`${classes.paragraph} ${classes.number}`}>
          20K
        </Paragraph>
        <Paragraph className={`${classes.paragraph} ${classes.title}`}>
          {t("fourth.downloads")}
        </Paragraph>
        <Text className={classes.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non a, netus
          urna enim tristique.
        </Text>
      </Col>
    </Row>
  );
};

export default HomeFourth;
