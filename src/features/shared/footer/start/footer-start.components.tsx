import { Col, Image, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../core/core";
import HeaderLogo from "../../header/start/header-logo.components";
import classes from "../style.module.css";

interface FooterStartProps {}

const FooterStart: FunctionComponent<FooterStartProps> = () => {
  const { t } = useTranslation(TranslationFiles.COMMON);

  return (
    <Row gutter={[16, 16]}>
      <Col>
        <Space direction="vertical" size="middle">
          <HeaderLogo size="92px" image="/images/logo/paprika.png" />
          <Text className={classes.footerStartText}>
            {t("socialMediaFollow")}
          </Text>
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
                preview={false}
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
                preview={false}
              />
            </a>
          </Space>
        </Space>
      </Col>
    </Row>
  );
};

export default FooterStart;
