import { Col, Image, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/dist/client/router";
import { FunctionComponent } from "react";
import { PagesUrls, TranslationFiles } from "../../../../core/core";
import HeaderLogo from "../../header/start/header-logo.components";
import LinkComponent from "../../link/link.components";
import classes from "../style.module.css";

interface FooterStartProps {}

const FooterStart: FunctionComponent<FooterStartProps> = () => {
  const { t } = useTranslation(TranslationFiles.COMMON);

  const { locale } = useRouter();

  return (
    <Row gutter={[16, 16]}>
      <Col>
        <Space direction="vertical" size="middle">
          <HeaderLogo size="92px" />
          <Text className={classes.footerStartText}>
            {t("socialMediaFollow")}
          </Text>
          <Space>
            <a
              href="https://www.facebook.com/paprika.sar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/facebook.svg"
                alt={t("facebook")}
                width="32px"
                height="32px"
                preview={false}
              />
            </a>
            <a
              href="https://www.instagram.com/paprika_sy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/instagram.svg"
                alt={t("instagram")}
                width="32px"
                height="32px"
                preview={false}
              />
            </a>
            <LinkComponent
              linkProps={{ href: PagesUrls.HOME, locale: locale }}
              anchorProps={{ className: classes.listLink }}
            >
              <Image
                src="/icons/whats-app.svg"
                alt={t("whatsApp")}
                width="32px"
                height="32px"
                preview={false}
              />
            </LinkComponent>
            <LinkComponent
              linkProps={{ href: PagesUrls.HOME, locale: locale }}
              anchorProps={{ className: classes.listLink }}
            >
              <Image
                src="/icons/twitter.svg"
                alt={t("twitter")}
                width="32px"
                height="32px"
                preview={false}
              />
            </LinkComponent>
          </Space>
        </Space>
      </Col>
    </Row>
  );
};

export default FooterStart;
