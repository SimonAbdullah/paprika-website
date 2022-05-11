import { Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../core/core";
import Image from "next/image";
import classes from "../style.module.css";

interface FooterEndProps {}

const FooterEnd: FunctionComponent<FooterEndProps> = () => {
  const { t } = useTranslation(TranslationFiles.COMMON);

  return (
    <Row>
      <Space direction="vertical" size="middle">
        <Text className={classes.footerEndTitle}>{t("appDownload")}</Text>
        <Row>
          <div className={classes.googlePlayContainer}>
            <a
              href="https://play.google.com/store/apps/details?id=com.paprika_sy.customer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={`/icons/google-play.svg`}
                alt={t("googlePlay")}
                width="120px"
                height="40px"
                layout="fixed"
                priority={true}
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
                src={`/icons/app-store.svg`}
                alt={t("appStore")}
                width="120px"
                height="40px"
                layout="fixed"
                priority={true}
              />
            </a>
          </div>
          <div className={classes.directLinkContainer}>
            <a
              href={`https://paprika-sy.com/paprika-customer.prod.v${process.env.NEXT_PUBLIC_APP_VERSION}.apk`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={`/icons/direct-link.svg`}
                alt={t("directLink")}
                width="120px"
                height="40px"
                layout="fixed"
                priority={true}
              />
            </a>
          </div>
        </Row>
      </Space>
    </Row>
  );
};

export default FooterEnd;
