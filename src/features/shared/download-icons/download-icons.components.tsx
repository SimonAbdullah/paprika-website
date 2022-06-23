import { Button, message, Space } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { TranslationFiles } from "../../../core/core";
import { generateUuid } from "../../../core/functions";
import { customerDownloadLinkServices } from "../../customers/services/customer-download-link/customer-download-link.services";
import classes from "./style.module.css";

interface DownloadIconsProps {}

const DownloadIcons: FunctionComponent<DownloadIconsProps> = () => {
    
    const { t } = useTranslation(TranslationFiles.COMMON);

    const [isDisabled, setIsDisabled] = useState(false);

    const getPaprikaDownloadLink = async () => {
        try {
          setIsDisabled(true);
          if(!localStorage.getItem("downloadToken")) {
            localStorage.setItem("downloadToken", generateUuid());
          }
          const result = await customerDownloadLinkServices.getCustomerDownloadLink({downloadToken: localStorage.getItem("downloadToken")!});
          window.open(result.result.paprikaDownloadLink, "_blank");
        } catch (error) {
          message.error(t("anErrorOccurredWhileDownloading"));
        } finally {
          setIsDisabled(false);
        }
      };
    return(
        <>
            <div className={classes.textContainer}>
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
                    <Button
                        style={{padding: "0px", background: "none", border: "none"}}
                        onClick={() => getPaprikaDownloadLink()}
                        disabled={isDisabled}
                    >
                    <Image
                        src={`/icons/direct-link-circle.png`}
                        alt={t("directLink")}
                        width="54px"
                        height="54px"
                        layout="fixed"
                        className={classes.image}
                    />
                    </Button>
                </div>
            </Space>
        </>
    );
}
export default DownloadIcons;
