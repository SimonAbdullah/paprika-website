import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/dist/client/router";
import { FunctionComponent } from "react";
import { PagesUrls, TranslationFiles } from "../../../../core/core";
import LinkComponent from "../../link/link.components";
import classes from "../style.module.css";

interface FooterMiddleProps {}

const FooterMiddle: FunctionComponent<FooterMiddleProps> = () => {
  const { t } = useTranslation(TranslationFiles.COMMON);

  const { locale } = useRouter();

  return (
    <Row className={classes.middleRow} gutter={[16, 16]}>
      <Col xs={24} sm={8}>
        <ul className={classes.list}>
          <Text className={classes.listTitle}>{t("aboutPaprika")}</Text>
          <li>
            <LinkComponent
              linkProps={{ href: PagesUrls.HOME, locale: locale }}
              anchorProps={{ className: classes.listLink }}
            >
              {t("whoWeAre")}
            </LinkComponent>
          </li>
          <li>
            <LinkComponent
              linkProps={{ href: PagesUrls.HOME, locale: locale }}
              anchorProps={{ className: classes.listLink }}
            >
              {t("registerYourRestaurant")}
            </LinkComponent>
          </li>
        </ul>
      </Col>
      <Col xs={24} sm={8}>
        <ul className={classes.list}>
          <Text className={classes.listTitle}>{t("support")}</Text>
          <li>
            <LinkComponent
              linkProps={{ href: PagesUrls.HOME, locale: locale }}
              anchorProps={{ className: classes.listLink }}
            >
              {t("account")}
            </LinkComponent>
          </li>
          <li>
            <LinkComponent
              linkProps={{ href: PagesUrls.HOME, locale: locale }}
              anchorProps={{ className: classes.listLink }}
            >
              {t("supportCenter")}
            </LinkComponent>
          </li>
          <li>
            <LinkComponent
              linkProps={{ href: PagesUrls.HOME, locale: locale }}
              anchorProps={{ className: classes.listLink }}
            >
              {t("feedback")}
            </LinkComponent>
          </li>
        </ul>
      </Col>
      <Col xs={24} sm={8}>
        <ul className={classes.list}>
          <Text className={classes.listTitle}>{t("getInTouch")}</Text>
          <li>
            <LinkComponent
              linkProps={{ href: "mailto:info@parpika.com", locale: locale }}
              anchorProps={{ className: classes.listLink }}
            >
              info@parpika.com
            </LinkComponent>
          </li>
          <li>
            <LinkComponent
              linkProps={{ href: "tel:+963 9356 85210", locale: locale }}
              anchorProps={{ className: classes.listLink }}
            >
              +963 9356 85210
            </LinkComponent>
          </li>
        </ul>
      </Col>
    </Row>
  );
};

export default FooterMiddle;
