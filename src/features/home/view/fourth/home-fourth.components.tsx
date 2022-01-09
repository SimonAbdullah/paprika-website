import { Col, Row } from "antd";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../core/core";
import classes from "./style.module.css";
import Title from "antd/lib/typography/Title";
import HomeFourthServiceColumn from "./home-fourth-service-column.components";
import { useFourthData } from "./fourth-data";
import HomeFourthServiceCard from "./home-fourth-service-card.components";

interface HomeFourthProps {}

const HomeFourth: FunctionComponent<HomeFourthProps> = () => {
  const { t } = useTranslation(TranslationFiles.HOME);

  const data = useFourthData();

  return (
    <>
      <div data-aos="slide-left" data-aos-duration="500">
        <Row className={classes.fourthContainer} justify="center" id="services">
          <Col span={24}>
            <Title level={3} className={classes.mainTitle}>
              {t("fourth.title")}
            </Title>
          </Col>
          {data.map((item, index) => (
            <HomeFourthServiceColumn
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
              learnMoreHref={item.learnMoreHref}
            />
          ))}
        </Row>
      </div>
      <Row
        justify="center"
        gutter={[0, 48]}
        className={classes.fourthSecondContainer}
      >
        {data.map((item, index) => (
          <HomeFourthServiceCard
            key={index}
            data={item}
            isContentRight={index % 2 !== 0}
          />
        ))}
      </Row>
    </>
  );
};

export default HomeFourth;
