import { List, message, Space } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent, useEffect, useState } from "react";
import { TranslationFiles } from "../../../../../core/core";
import Image from "next/image";
import classes from "./style.module.css";
import { useServicesData } from "./services-data";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import CopyToClipboard from "react-copy-to-clipboard";
import { LinkOutlined } from "@ant-design/icons";

interface RestaurantServicesProps {}

const RestaurantServices: FunctionComponent<RestaurantServicesProps> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { t: tCommon } = useTranslation(TranslationFiles.COMMON);

  const { hasReservation } = useRestaurantDetails();

  const [restaurantURL, setRestaurantURL] = useState("");

  useEffect(() => {
    setRestaurantURL(window.location.href);
  },[]);

  return (
    <List
      header={
        <>
          <Text className={classes.title} id="how-we-can-serve-you">{t("howWeCanServeYou")}</Text>
          <CopyToClipboard
            text={`${restaurantURL}#how-we-can-serve-you`} 
            onCopy={() => message.success(tCommon("linkCopied"))}
          >
            <LinkOutlined style={{margin: "0 1rem", fontSize: "1.2rem"}} />
          </CopyToClipboard>
        </>
      }
      split={false}
      grid={{
        column: 3,
        xxl: hasReservation ? 10 : 10,
        xl: hasReservation ? 10 : 10,
        lg: hasReservation ? 8 : 10,
        md: 7,
        sm: 6,
        xs: 3,
      }}
      dataSource={useServicesData().filter(
        (service) => service.description !== null
      )}
      renderItem={(item) => {
        return (
          <List.Item key={item.logo} className={classes.item}>
            <Space direction="vertical" className={classes.space}>
              <Image
                src={item.logo}
                alt={item.alt}
                width="38px"
                height="38px"
                objectFit="contain"
                objectPosition="center"
              />
              <Text className={classes.itemTitle}>{item.title}</Text>
              <Text className={classes.itemDescription}>
                {item.description}
              </Text>
            </Space>
          </List.Item>
        );
      }}
    />
  );
};

export default RestaurantServices;
