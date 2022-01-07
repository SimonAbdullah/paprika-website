import { Col, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/dist/client/router";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../core/core";
import LinkComponent from "../../link/link.components";
import Image from "next/image";
import classes from "../style.module.css";

interface FooterMiddleProps {}

const FooterMiddle: FunctionComponent<FooterMiddleProps> = () => {
  const { t } = useTranslation(TranslationFiles.COMMON);

  const { locale } = useRouter();

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12}>
        <ul className={classes.list}>
          <Text className={classes.listTitle}>{t("getInTouch")}</Text>
          <li>
            <LinkComponent
              linkProps={{ href: "mailto:info@paprika-sy.com", locale: locale }}
              anchorProps={{ className: classes.listLink }}
            >
              info@paprika-sy.com
            </LinkComponent>
          </li>
          <li dir="ltr">
            <LinkComponent
              linkProps={{ href: "tel:+963 9356 85210", locale: locale }}
              anchorProps={{ className: classes.listLink }}
            >
              +963 9356 85210
            </LinkComponent>
          </li>
          <li>
            <a
              href="https://paprika-sy.com/paprika-privacy-policy.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.listLink}
            >
              {t("privacyPolicy")}
            </a>
          </li>
        </ul>
      </Col>
      <Col xs={24} sm={12}>
        <ul className={classes.list}>
          <Text className={classes.listTitle}>{t("followUs")}</Text>
          <li>
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
                />
              </a>
            </Space>
          </li>
        </ul>
      </Col>
    </Row>
  );
};

export default FooterMiddle;
