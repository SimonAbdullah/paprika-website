import { Col, Image, Row, Space } from "antd";
import Title from "antd/lib/typography/Title";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/dist/client/router";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../core/core";
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
              <a
                href="https://play.google.com/store/apps/details?id=com.paprika_sy.customer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={`/icons/google-play-${locale}.png`}
                  alt={t("googlePlay")}
                  width="9rem"
                  height="4rem"
                  preview={false}
                />
              </a>
            </div>
            <div className={classes.appStoreContainer}>
              <a
                href="https://apps.apple.com/us/app/%D8%A8%D8%A7%D8%A8%D8%B1%D9%8A%D9%83%D8%A7/id1566120897#?platform=iphone"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={`/icons/app-store-${locale}.svg`}
                  alt={t("appStore")}
                  width="8rem"
                  height="4rem"
                  preview={false}
                />
              </a>
            </div>
          </div>
        </Space>
      </Col>
    </Row>
  );
};

export default FooterEnd;
