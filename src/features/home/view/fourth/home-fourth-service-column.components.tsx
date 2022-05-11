import { FunctionComponent, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { TranslationFiles } from "../../../../core/core";
import Paragraph from "antd/lib/typography/Paragraph";
import Text from "antd/lib/typography/Text";
import { AppContext } from "../../../../core/app/app.context";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import classes from "./style.module.css";
import { Col } from "antd";

interface HomeFourthServiceColumnProps {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  learnMoreHref: string;
}

const HomeFourthServiceColumn: FunctionComponent<
  HomeFourthServiceColumnProps
> = ({ image, title, description, learnMoreHref }) => {
  const { t } = useTranslation(TranslationFiles.HOME);

  const { direction } = useContext(AppContext);

  return (
    <Col md={12} lg={8} xl={6} className={classes.column}>
      <div data-aos="zoom-out" data-aos-duration="500">
        <div className={classes.columnContent}>
          <Image
            src={image.src}
            alt={image.alt}
            width="80px"
            height="80px"
            objectPosition="center"
            priority={true}
          />
          <Paragraph className={`${classes.paragraph} ${classes.title}`}>
            {title}
          </Paragraph>
          <Text className={classes.text}>{description}</Text>
        </div>
        <Text className={`${classes.text} ${classes.learnMore}`}>
          <Link href={learnMoreHref}>
            <a>
              {t("fourth.learnMore")}{" "}
              {direction === "ltr" ? <RightOutlined /> : <LeftOutlined />}
            </a>
          </Link>
        </Text>
      </div>
    </Col>
  );
};

export default HomeFourthServiceColumn;
