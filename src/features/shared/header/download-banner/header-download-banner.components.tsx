import { Button, Row, Space } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Text from "antd/lib/typography/Text";
import { FunctionComponent, useState } from "react";
import Image from "next/image";
import classes from "./style.module.css";
import useTranslation from "next-translate/useTranslation";
import { TranslationFiles } from "../../../../core/core";
import { CloseOutlined } from "@ant-design/icons";

interface HeaderDownloadBannerProps {}

const HeaderDownloadBanner: FunctionComponent<
  HeaderDownloadBannerProps
> = () => {
  const { t } = useTranslation(TranslationFiles.COMMON);

  const { xs } = useBreakpoint();

  const [visible, setVisible] = useState(true);

  return xs && visible ? (
    <Row justify="center" className={classes.container}>
      <Button
        type="link"
        size="small"
        icon={<CloseOutlined />}
        className={classes.closeButton}
        onClick={() => {
          setVisible(false);
        }}
      />
      <Space direction="vertical">
        <div className={classes.textContainer}>
          <Text className={classes.text}>
            {"Don't have Paprika on your device..."}
          </Text>
          <br />
          <Text className={classes.title}>Download Now!</Text>
        </div>
        <div className={classes.googlePlayContainer}>
          <a
            href="https://play.google.com/store/apps/details?id=com.paprika_sy.customer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={`/icons/google-play.svg`}
              alt={t("googlePlay")}
              width="100%"
              height="33px"
              layout="responsive"
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
              width="100%"
              height="33px"
              layout="responsive"
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
              width="100%"
              height="33px"
              layout="responsive"
            />
          </a>
        </div>
      </Space>
    </Row>
  ) : null;
};

export default HeaderDownloadBanner;
