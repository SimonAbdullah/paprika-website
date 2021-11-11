import { List, Space } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../../core/core";
import Image from "next/image";
import classes from "./style.module.css";
import { useServicesData } from "./services-data";

interface RestaurantServicesProps {}

const RestaurantServices: FunctionComponent<RestaurantServicesProps> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);
  return (
    <List
      header={<Text className={classes.title}>{t("howWeCanServeYou")}</Text>}
      split={false}
      grid={{
        column: 2,
        xxl: 7,
        xl: 6,
        lg: 5,
        md: 5,
        sm: 4,
        xs: 2,
      }}
      dataSource={useServicesData()}
      renderItem={(item) => {
        return (
          <List.Item key={item.logo} className={classes.item}>
            <Space direction="vertical" className={classes.space}>
              <Image
                src={item.logo}
                alt={item.alt}
                width="48px"
                height="48px"
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
