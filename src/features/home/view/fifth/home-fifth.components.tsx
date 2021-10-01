import { Button, Col, Row } from "antd";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent, useContext } from "react";
import { TranslationFiles } from "../../../../core/core";
import classes from "./style.module.css";
import Image from "next/image";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { AppContext } from "../../../../core/app/app.context";

interface HomeFifthProps {}

const HomeFifth: FunctionComponent<HomeFifthProps> = () => {
  const { t } = useTranslation(TranslationFiles.HOME);

  const { lg } = useBreakpoint();

  const { direction } = useContext(AppContext);

  return (
    <Row className={classes.fifthContainer} justify="center">
      <Col xs={24} lg={15} className={classes.contentContainer}>
        <Title level={3} className={classes.title}>
          {t("fifth.submitYourRestaurantToOurList")}
        </Title>
        <Row justify={lg ? "start" : "center"}>
          <Col>
            <Row justify={lg ? "start" : "center"}>
              <Col>
                <Image
                  className={classes.chefWomanImage}
                  src="/images/home/fifth-open.svg"
                  alt={t("fifth.alt.openImage")}
                  width="80px"
                  height="80px"
                />
              </Col>
              <Col>
                <div className={classes.textContainer}>
                  <Text className={classes.text}>
                    {t("attractNewCustomersToYourRestaurant")}
                  </Text>
                </div>
                <div className={classes.textContainer}>
                  <Text className={classes.text}>
                    {t("fifth.partnerWithPaprikaToday")}
                  </Text>
                  <Text className={`${classes.text} ${classes.paprika}`}>
                    {t("paprika")}
                  </Text>
                  <Text className={classes.text}>
                    {t("fifth.todayItsEasyAndYouCanCancelAtAnyTime")}
                  </Text>
                </div>
              </Col>
            </Row>
            <div className={classes.buttonContainer}>
              <Button size="large" type="primary">
                {t("fifth.getStarted")}
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
      <Col xs={24} lg={9} className={classes.chefWomanImageContainer}>
        <Image
          className={classes.chefWomanImage}
          src={`/images/home/fifth-chef-woman${
            direction === "rtl" ? "-reverse" : ""
          }.png`}
          alt={t("fifth.alt.chefWomanImage")}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </Col>
    </Row>
  );
};

export default HomeFifth;
