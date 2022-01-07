import { Col, Row, Space } from "antd";
import Title from "antd/lib/typography/Title";
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
    <Row className={classes.thirdContainer} justify="center" id="aboutUs">
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
        <Row className={classes.row}>
          <Title level={3} className={classes.title}>
            {t("third.aboutUs")}
          </Title>
          <div className={classes.textContainer}>
            <Text className={classes.text}>
              {t("third.aboutUsDescription")}
            </Text>
          </div>
        </Row>
        <Row className={classes.row}>
          <Title level={3} className={classes.title}>
            {t("third.followUs")}
          </Title>
          <div className={classes.textContainer}>
            <Space>
              <a
                href="https://www.facebook.com/paprika.sar"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.listLink}
              >
                <Image
                  src="/icons/facebook.svg"
                  alt={t("facebook")}
                  width="32px"
                  height="32px"
                  layout="fixed"
                  className={classes.icon}
                />
              </a>
              <a
                href="https://www.instagram.com/paprika_sy/"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.listLink}
              >
                <Image
                  src="/icons/instagram.svg"
                  alt={t("instagram")}
                  width="32px"
                  height="32px"
                  layout="fixed"
                  className={classes.icon}
                />
              </a>
            </Space>
          </div>
        </Row>
      </Col>
    </Row>
  );
};

export default HomeThird;
