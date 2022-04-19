import { Button, Row, Space } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Text from "antd/lib/typography/Text";
import { FunctionComponent, useState } from "react";
import Image from "next/image";
import classes from "./style.module.css";
import useTranslation from "next-translate/useTranslation";
import { TranslationFiles } from "../../../../core/core";
import { CloseOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { UrlInApp } from "../../../../core/constants";
import { isMobile, isBrowser } from "react-device-detect";

interface HeaderDownloadBannerProps {}

const HeaderDownloadBanner: FunctionComponent<
  HeaderDownloadBannerProps
> = () => {
  const { t } = useTranslation(TranslationFiles.COMMON);

  const { xs } = useBreakpoint();

  const [visible, setVisible] = useState(true);

  const { asPath } = useRouter();

  return (isMobile && visible) || (isBrowser && xs && visible) ? (
    <>
      <Row justify="center" className={classes.container}>
        <Button
          type="link"
          size="large"
          icon={<CloseOutlined />}
          className={classes.closeButton}
          onClick={() => {
            setVisible(false);
          }}
        />
        <div className={classes.textContainer}>
          <Text className={classes.text}>
            {t("dontHavePaprikaOnYourDevice")}
          </Text>
          <br />
          <Text className={classes.title}>{t("downloadNow")}</Text>
        </div>
        <Space className={classes.imagesContainer}>
          <div className={classes.googlePlayContainer}>
            <a
              href="https://play.google.com/store/apps/details?id=com.paprika_sy.customer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={`/icons/google-play-circle.png`}
                alt={t("googlePlay")}
                width="54px"
                height="54px"
                layout="fixed"
                className={classes.image}
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
                src={`/icons/app-store-circle.png`}
                alt={t("appStore")}
                width="54px"
                height="54px"
                layout="fixed"
                className={classes.image}
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
                src={`/icons/direct-link-circle.png`}
                alt={t("directLink")}
                width="54px"
                height="54px"
                layout="fixed"
                className={classes.image}
              />
            </a>
          </div>
        </Space>
      </Row>
      <Row
        justify="center"
        className={classes.container}
        style={{ paddingTop: "0px" }}
      >
        <div className={classes.textContainer} style={{ marginBottom: "0px" }}>
          <Text className={classes.text}>
            {t("ifYouHavePaprikaOnYourDevice")}
          </Text>
        </div>
        <Button
          type="link"
          size="large"
          style={{ fontSize: "20px", fontWeight: 600, padding: "0px" }}
          onClick={() => {
            window.open(`${UrlInApp.paprikaUrlInApp}${asPath}`, "_blank");
          }}
        >
          {t("OpenInApp")}
        </Button>
      </Row>
    </>
  ) : null;
};

export default HeaderDownloadBanner;
