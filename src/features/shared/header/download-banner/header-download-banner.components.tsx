import { Button, Modal, Row } from "antd";
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
import urlJoin from "url-join";
import DownloadIcons from "../../download-icons/download-icons.components";

interface HeaderDownloadBannerProps {}

const HeaderDownloadBanner: FunctionComponent<
  HeaderDownloadBannerProps
> = () => {
  const { t } = useTranslation(TranslationFiles.COMMON);

  const { xs } = useBreakpoint();

  const [visible, setVisible] = useState(true);

  const { asPath } = useRouter();
    
  const [openDownloadAppModal, setOpenDownloadAppModal] = useState(false);

  const [openInAppLoading, setOpenInAppLoading] = useState(false);

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
        </div>
        <DownloadIcons />
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
          type="default"
          size="large"
          className={classes.openInAppBtn}
          onClick={() => {
            setOpenInAppLoading(true);
            window.location.href = `${urlJoin(UrlInApp.paprikaUrlInApp, asPath)}`;
            setTimeout(() => {
              const state = document.visibilityState;
              if(state === "visible"){
                setOpenInAppLoading(false);
                setOpenDownloadAppModal(true);
              } else {
                setOpenInAppLoading(false);
              }
            }, 5000);
          }}
          loading={openInAppLoading}
        >
          {t("OpenInApp")}
        </Button>
      </Row>

      { isMobile && (
        <Modal 
          visible={openDownloadAppModal}
          destroyOnClose={true}
          width={400}
          cancelText={t("continueHere")}
          onCancel={()=> setOpenDownloadAppModal(false)}
          cancelButtonProps= {{ type: "primary" }}
          okButtonProps={{ hidden: true }}
        >
          <div style={{margin: "0 0.5rem", textAlign: "center", fontSize: "1rem"}}>
            <Image 
              src="/images/logo/paprika.png"
              alt="Paprika Logo"
              width={130}
              height={130}
            />
            <div style={{marginTop: "0.7rem"}}>
              {t("itSeemsThatYouDontHavePaprikaInstalledOnYourDevice")}
            </div>
            <Row justify="center">
              <div style={{marginTop: "0.5rem"}}>
                <DownloadIcons />
              </div>
            </Row>
          </div>
        </Modal>  
      )}
    </>
  ) : null;
};

export default HeaderDownloadBanner;
