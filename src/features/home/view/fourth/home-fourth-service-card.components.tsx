import { Button, Card, Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import { FunctionComponent } from "react";
import { HomeFourthData } from "./fourth-data";
import Image from "next/image";
import classes from "./style.module.css";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Link from "next/link";
import { PagesUrls, TranslationFiles } from "../../../../core/core";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

interface HomeFourthServiceCardProps {
  data: HomeFourthData;
  isContentRight?: boolean;
}

const HomeFourthServiceCard: FunctionComponent<HomeFourthServiceCardProps> = ({
  data,
  isContentRight,
}) => {
  const { xs, md } = useBreakpoint();

  const { locale } = useRouter();

  const { t } = useTranslation(TranslationFiles.HOME);

  return (
    <Col span={22} id={data.id} className={classes.cardContainer}>
      <div data-aos={data.animationType} data-aos-duration="500">
        <Card className={classes.card}>
          <Row
            justify={!md ? "center" : "space-around"}
            align="middle"
            gutter={[0, 16]}
          >
            <Col
              xs={22}
              md={11}
              order={md ? (isContentRight ? 1 : 0) : 0}
              style={{ textAlign: !md ? "center" : "inherit" }}
            >
              <Title level={3} className={classes.cardTitle}>
                <Text style={{ marginInlineEnd: !xs ? "20px" : "1px" }}>
                  {data.title}
                </Text>
                {data.id === "discoverRestaurants" ? (
                  <>
                    <Link href={PagesUrls.RESTAURANTS} locale={locale}>
                      <a>
                        <Button
                          size="middle"
                          type="primary"
                          style={{
                            verticalAlign: "middle",
                          }}
                        >
                          <Text>{t("fourth.restaurantsList")}</Text>
                        </Button>
                      </a>
                    </Link>
                  </>
                ) : null}
              </Title>
              <Text className={classes.cardText}>{data.description}</Text>
            </Col>
            <Col
              xs={22}
              md={11}
              style={{ position: "relative", minHeight: "16rem" }}
            >
              <Image
                className={classes.cardImage}
                src={data.backgroundImage.src}
                alt={data.backgroundImage.alt}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            </Col>
          </Row>
        </Card>
      </div>
    </Col>
  );
};

export default HomeFourthServiceCard;
