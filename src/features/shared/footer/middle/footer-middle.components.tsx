import { Col, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/dist/client/router";
import { FunctionComponent } from "react";
import { PagesUrls, TranslationFiles } from "../../../../core/core";
import LinkComponent from "../../link/link.components";
import Image from "next/image";
import classes from "../style.module.css";

interface FooterMiddleProps {}

const FooterMiddle: FunctionComponent<FooterMiddleProps> = () => {
  const { t } = useTranslation(TranslationFiles.COMMON);

  const { locale, pathname } = useRouter();

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={8}>
        <ul className={classes.list}>
          <Text className={classes.listTitle}>{t("aboutPaprika")}</Text>
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
          <li>
            <LinkComponent
              linkProps={{ href: PagesUrls.RESTAURANTS, locale: locale }}
              anchorProps={{ className: classes.listLink }}
            >
              {t("restaurants")}
            </LinkComponent>
          </li>
          <li>
            <LinkComponent
              linkProps={{ href: `${PagesUrls.HOME}#services`, locale: locale }}
              anchorProps={{ className: classes.listLink }}
            >
              {t("ourServices")}
            </LinkComponent>
          </li>
        </ul>
      </Col>
      <Col xs={24} sm={8}>
        <ul className={classes.list}>
          <Text className={classes.listTitle}>{t("getInTouch")}</Text>
          <li>
            <LinkComponent
              linkProps={{
                href: `mailto:${process?.env?.NEXT_PUBLIC_EMAIL_ADDRESS}`,
                locale: locale,
              }}
              anchorProps={{ className: classes.listLink }}
            >
              {process?.env?.NEXT_PUBLIC_EMAIL_ADDRESS}
            </LinkComponent>
          </li>
          {/* Don't show phone number in support page because it's accessed by Apple App Review Team. */}
          {pathname !== "/support" && (
            <li dir="ltr">
              <LinkComponent
                linkProps={{
                  href: `tel:${process?.env?.NEXT_PUBLIC_PHONE_NUMBER}`,
                  locale: locale,
                }}
                anchorProps={{ className: classes.listLink }}
              >
                {process?.env?.NEXT_PUBLIC_PHONE_NUMBER}
              </LinkComponent>
            </li>
          )}
        </ul>
      </Col>
      <Col xs={24} sm={8}>
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
