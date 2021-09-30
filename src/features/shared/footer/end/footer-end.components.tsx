import { Col, Image, Row, Space } from "antd";
import Title from "antd/lib/typography/Title";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/dist/client/router";
import { FunctionComponent } from "react";
import { PagesUrls, TranslationFiles } from "../../../../core/core";
import LinkComponent from "../../link/link.components";
import classes from "../style.module.css";

interface FooterEndProps {}

const FooterEnd: FunctionComponent<FooterEndProps> = () => {
  const { t } = useTranslation(TranslationFiles.COMMON);

  const { locale } = useRouter();

  return (
    <Row gutter={[16, 16]}>
      <Col>
        <Space direction="vertical" size="large">
          <Title level={4} className={classes.footerEndTitle}>
            {t("appDownload")}
          </Title>
          <div>
            <div className={classes.googlePlayContainer}>
              <LinkComponent
                linkProps={{ href: PagesUrls.HOME, locale: locale }}
                anchorProps={{
                  className: `${classes.googlePlayButton} ${classes.listLink}`,
                }}
              >
                <Image
                  src={`/icons/google-play-${locale}.png`}
                  alt={t("googlePlay")}
                  width="9rem"
                  height="4rem"
                  preview={false}
                />
              </LinkComponent>
            </div>
            <div className={classes.appStoreContainer}>
              <LinkComponent
                linkProps={{ href: PagesUrls.HOME, locale: locale }}
                anchorProps={{
                  className: `${classes.appStoreButton} ${classes.listLink}`,
                }}
              >
                <Image
                  src={`/icons/app-store-${locale}.svg`}
                  alt={t("appStore")}
                  width="8rem"
                  height="4rem"
                  preview={false}
                />
              </LinkComponent>
            </div>
          </div>
        </Space>
      </Col>
    </Row>
  );
};

export default FooterEnd;
