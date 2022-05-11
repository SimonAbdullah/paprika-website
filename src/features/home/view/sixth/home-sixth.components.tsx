import { Button, Col, Row } from "antd";
import { FunctionComponent } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { PagesUrls, TranslationFiles } from "../../../../core/core";
import classes from "./style.module.css";
import Text from "antd/lib/typography/Text";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

interface HomeSixthProps {}

const HomeSixth: FunctionComponent<HomeSixthProps> = () => {
  const { t } = useTranslation(TranslationFiles.HOME);

  const { locale } = useRouter();

  return (
    <Row justify="center" align="middle" className={classes.sixthContainer}>
      <Col span={22} style={{ position: "relative" }}>
        <Image
          className={classes.backgroundImage}
          src={`/images/home/sixth-background${
            locale === "ar" ? "-reverse" : ""
          }.png`}
          priority={true}
          alt={t("alt.backgroundImage")}
          layout="fill"
          objectFit="fill"
          objectPosition="center"
        />
        <Row justify="center" className={classes.contentRow}>
          <Col span={24} className={classes.contentColumn}>
            <div className={classes.contentContainer}>
              <Text className={classes.title}>
                {t("sixth.weHaveALotOfRestaurants")}
              </Text>
              <Link href={PagesUrls.RESTAURANTS} locale={locale}>
                <a>
                  <Button>
                    <Text className={classes.buttonText}>
                      {t("sixth.restaurantsList")}
                    </Text>
                  </Button>
                </a>
              </Link>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default HomeSixth;
